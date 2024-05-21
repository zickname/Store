using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.Orders;
using Store.Entity;
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

    private static async Task<Ok<OrderResponse>> GetById(int id, AppDbContext db)
    {
        var orders = await db.Orders
            .Where(order => order.Id == id)
            .Include(order => order.Products)
            .Include(order => order.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.Products
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity))
                    .ToList(),
                order.TotalAmount))
            .FirstOrDefaultAsync();

        return TypedResults.Ok(orders);
    }

    private static async Task<Ok<OrderResponse>> GetByIdForUser(int id, AppDbContext db, ICurrentAccount account)
    {
        var userId = account.GetUserId();

        var orders = await db.Orders
            .Where(order => order.UserId == userId && order.Id == id)
            .Include(order => order.Products)
            .Include(order => order.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.Products
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity))
                    .ToList(),
                order.TotalAmount))
            .FirstOrDefaultAsync();

        return TypedResults.Ok(orders);
    }

    private static async Task<Ok<List<OrderResponse>>> GetAllByUser(AppDbContext db, ICurrentAccount account)
    {
        var userId = account.GetUserId();

        var orders = await db.Orders
            .Where(order => order.UserId == userId)
            .Include(order => order.Products)
            .Include(order => order.User)
            .Select(order => new OrderResponse(
                order.Id,
                order.UserId,
                order.CreatedDate,
                order.Address,
                order.Products
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity))
                    .ToList(),
                order.TotalAmount))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    private static async Task<Ok<OrderResponse>> CreateOrder(CreateRequestOrder orderDto, AppDbContext db,
        ICurrentAccount account)
    {
        var userId = account.GetUserId();

        var order = new Order
        {
            TotalAmount = orderDto.TotalAmount,
            Address = orderDto.Address,
            Products = orderDto.Products
                .Select(p => new OrderDetails{
                    ProductId = p.ProductId,
                    Price = p.Price,
                   Quantity = p.Quantity
                }).ToList(),
            CreatedDate = DateTime.UtcNow,
            UserId = userId
        };

        db.Orders.Add(order);
        await db.SaveChangesAsync();

        var orderResponse = new OrderResponse(
            order.Id,
            order.UserId,
            order.CreatedDate,
            order.Address,
            order.Products
                .Select(item => new OrderDetailsDto(
                    item.ProductId,
                    item.Price,
                    item.Quantity)).ToList(),
            order.TotalAmount
        );

        return TypedResults.Ok(orderResponse);
    }

    private static async Task<Ok<List<OrderResponse>>> GetAll(AppDbContext db)
    {
        var orders = await db.Orders
            .Include(o => o.Products)
            .Include(o => o.User)
            .Select(o => new OrderResponse(
                o.Id,
                o.UserId,
                o.CreatedDate,
                o.Address,
                o.Products
                    .Select(p => new OrderDetailsDto(
                        p.ProductId,
                        p.Price,
                        p.Quantity))
                    .ToList(),
                o.TotalAmount))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    private static async Task<Results<Ok, NotFound>> DeleteOrder(int id, AppDbContext db)
    {
        var order = await db.Orders
            .Include(order => order.Products)
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