using Microsoft.AspNetCore.Authorization;
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
        endpoints.MapGet("api/admin/orders", GetAll);
        endpoints.MapGet("api/account/orders", GetAllByUser);
        endpoints.MapGet("api/account/order/{id:int}", GetById);
        endpoints.MapGet("api/admin/order/{id:int}", GetByIdForUser);
        endpoints.MapPost("api/orders/create", CreateOrder);
        endpoints.MapDelete("api/orders{id:int}", DeleteOrder);
    }

    [Authorize]
    private static async Task<Ok<OrderResponse>> GetById(int id, AppDbContext db)
    {
        var orders = await db.Orders
            .Where(order => order.Id == id)
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
                        p.Quantity))
                    .ToList(),
                order.Amount))
            .FirstOrDefaultAsync();

        return TypedResults.Ok(orders);
    }

    [Authorize]
    private static async Task<Results<Ok<OrderResponse>, UnauthorizedHttpResult>> GetByIdForUser(
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
                        p.Quantity))
                    .ToList(),
                order.Amount))
            .FirstOrDefaultAsync();

        return TypedResults.Ok(orders);
    }

    [Authorize]
    private static async Task<Results<Ok<List<OrderResponse>>, UnauthorizedHttpResult>> GetAllByUser(
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
                        p.Quantity))
                    .ToList(),
                order.Amount))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    [Authorize]
    private static async Task<Results<Ok<OrderResponse>, UnauthorizedHttpResult>> CreateOrder(
        CreateOrderRequest dto,
        AppDbContext db,
        ICurrentAccount account)
    {
        var userId = account.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var order = new Order
        {
            Amount = dto.TotalAmount,
            Address = dto.Address,
            DetailsList = dto.Products
                .Select(p => new OrderDetails
                {
                    ProductId = p.ProductId,
                    Price = p.Price,
                    Quantity = p.Quantity
                }).ToList(),
            CreatedDate = DateTime.UtcNow,
            UserId = (int)userId
        };

        db.Orders.Add(order);
        await db.SaveChangesAsync();

        var orderResponse = new OrderResponse(
            order.Id,
            order.UserId,
            order.CreatedDate,
            order.Address,
            order.DetailsList
                .Select(item => new OrderDetailsDto(
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
            .Select(o => new OrderResponse(
                o.Id,
                o.UserId,
                o.CreatedDate,
                o.Address,
                o.DetailsList
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity))
                    .ToList(),
                o.Amount))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    [Authorize]
    private static async Task<Results<Ok, NotFound>> DeleteOrder(int id, AppDbContext db)
    {
        var order = await db.Orders
            .Include(order => order.DetailsList)
            .FirstOrDefaultAsync(order => order.Id == id);

        if (order == null)
        {
            return TypedResults.NotFound();
        }

        db.Remove(order);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }
}