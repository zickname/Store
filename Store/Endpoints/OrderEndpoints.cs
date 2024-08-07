﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.Orders;
using Store.Entities;
using Store.Interfaces;
using Store.Services.Data;

namespace Store.Endpoints;

public static class OrderEndpoints
{
    public static void MapOrderEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/account/orders", GetAllForUser);
        endpoints.MapGet("api/account/orders/{id:int}", GetByIdForUser);
        endpoints.MapGet("api/admin/orders", GetAll);
        endpoints.MapGet("api/admin/orders/{id:int}", GetById);
        endpoints.MapPost("api/orders", Create);
        endpoints.MapDelete("api/orders/{id:int}", Delete);
    }

    [Authorize]
    private static async Task<Results<Ok<OrderResponse>, UnauthorizedHttpResult, BadRequest<string>>> GetByIdForUser(int id, AppDbContext db, ICurrentAccount account)
    {
        var userId = account.GetUserId();

        if (userId == null)
        {
            return TypedResults.Unauthorized();
        }
        
        var orders = await db.Orders
            .Where(order => order.Id == id && order.UserId == userId)
            .Include(order => order.DetailsList)
            .Include(order => order.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.DetailsList
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity,
                        p.Product.Name,
                        p.Product.Images.First().ImagePath))
                    .ToList(),
                order.Amount))
            .FirstOrDefaultAsync();

        return orders != null
            ? TypedResults.Ok(orders)
            : TypedResults.BadRequest("Произошла ошибка");
    }

    [Authorize]
    private static async Task<Results<Ok<OrderResponse>, BadRequest<string>, UnauthorizedHttpResult>> GetById(
        int id,
        AppDbContext db,
        ICurrentAccount account)
    {
        var userId = account.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var orders = await db.Orders
            .Where(order => order.UserId == userId && order.Id == id)
            .Include(order => order.DetailsList)
            .Include(order => order.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.DetailsList
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity,
                        p.Product.Name,
                        p.Product.Images.First().ImagePath))
                    .ToList(),
                order.Amount))
            .FirstOrDefaultAsync();

        return orders != null
            ? TypedResults.Ok(orders)
            : TypedResults.BadRequest("Произошла ошибка");
    }

    [Authorize]
    private static async Task<Results<Ok<List<OrderResponse>>, UnauthorizedHttpResult>> GetAllForUser(
        AppDbContext db,
        ICurrentAccount account)
    {
        var userId = account.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var orders = await db.Orders
            .Where(order => order.UserId == userId)
            .Include(order => order.DetailsList)
            .Include(order => order.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.DetailsList
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity,
                        p.Product.Name,
                        p.Product.Images.First().ImagePath))
                    .ToList(),
                order.Amount))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    [Authorize]
    private static async Task<Results<Ok<CreateOrderResponse>, BadRequest<string>, UnauthorizedHttpResult>> Create(
        CreateOrderRequest dto,
        AppDbContext db,
        ICurrentAccount account)
    {
        var userId = account.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var productIds = dto.Products.Select(p => p.ProductId).ToList();

        var productsFromDb = await db.Products
            .Where(product => productIds.Contains(product.Id))
            .Select(product => new { product.Id, product.Price })
            .ToDictionaryAsync(product => product.Id);

        if (productsFromDb.Count != productIds.Count)
        {
            return TypedResults.BadRequest("One or more products are invalid.");
        }

        var orderDetailsList = dto.Products
            .Select(dtoProduct =>
            {
                var dbProduct = productsFromDb[dtoProduct.ProductId];
                return new OrderDetails
                {
                    ProductId = dbProduct.Id,
                    Price = dbProduct.Price,
                    Quantity = dtoProduct.Quantity
                };
            }).ToList();

        var order = new Order
        {
            Amount = orderDetailsList.Sum(od => od.Price * od.Quantity),
            Address = dto.Address,
            DetailsList = orderDetailsList,
            CreatedDate = DateTime.UtcNow,
            UserId = (int)userId
        };

        var cartProducts = await db.Carts.Where(cart => cart.UserId == userId).ToListAsync();

        db.Orders.Add(order);
        db.Carts.RemoveRange(cartProducts);
        await db.SaveChangesAsync();

        var orderResponse = new CreateOrderResponse(
            order.Id,
            order.UserId,
            order.CreatedDate,
            order.Address,
            order.DetailsList
                .Select(item => new OrderDetailsRequest(
                    item.ProductId,
                    item.Price,
                    item.Quantity)).ToList(),
            order.Amount
        );

        return TypedResults.Ok(orderResponse);
    }

    [Authorize]
    private static async Task<Ok<List<OrderResponse>>> GetAll(AppDbContext db)
    {
        var orders = await db.Orders
            .Include(o => o.DetailsList)
            .Include(o => o.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.DetailsList
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity,
                        p.Product.Name,
                        p.Product.Images.First().ImagePath))
                    .ToList(),
                order.Amount))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    [Authorize]
    private static async Task<Results<Ok, NotFound<string>>> Delete(int id, AppDbContext db)
    {
        var order = await db.Orders
            .Include(order => order.DetailsList)
            .FirstOrDefaultAsync(order => order.Id == id);

        if (order == null)
        {
            return TypedResults.NotFound("Произошла ошибка");
        }

        db.Remove(order);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }
}