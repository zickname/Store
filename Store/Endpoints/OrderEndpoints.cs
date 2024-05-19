using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTO.Orders;
using Store.Interfaces;
using Store.Models;
using Store.Services.Data;

namespace Store.Endpoints;

public static class OrderEndpoints
{
    public static void MapOrderEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/orders", GetAll);
        endpoints.MapGet("api/order/{id:int}", GetById);
        endpoints.MapPost("api/orders/create", CreateOrder);
        endpoints.MapDelete("api/orders{id:int}", DeleteOrder);
    }

    private static async Task GetById()
    {
        throw new NotImplementedException();
    }

    private static async Task GetAll(HttpContext context)
    {
        throw new NotImplementedException();
    }

    private static async Task<Ok<OrderResponse>> CreateOrder(CreateRequestOrder orderDto, AppDbContext db,
        CurrentAccount account)
    {
        var userId = account.GetUserIdFromClaim();

        var order = new Order
        {
            TotalAmount = orderDto.TotalAmount,
            Address = orderDto.Address,
            Products = orderDto.Products
                .Select(p => new OrderDetailsDto(
                    p.ProductId,
                    p.Price,
                    p.Quantity
                )).ToList(),
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

    private static async Task<Ok<List<OrderResponse>>> GetOrders(AppDbContext db)
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
                        p.Quantity)).ToList(),
                o.TotalAmount
            ))
            .ToListAsync();

        return TypedResults.Ok(orders);
    }

    private static async Task<Results<Ok, NotFound>> DeleteOrder(int id, AppDbContext db)
    {
        var order = await db.Orders.FindAsync(id);

        if (order == null)
        {
            return TypedResults.NotFound();
        }

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }
}