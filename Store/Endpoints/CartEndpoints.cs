using Microsoft.AspNetCore.Mvc;
using Store.DTO.Carts;
using Store.Models;
using Store.Services.Data;

namespace Store.Endpoints;

public static class CartEndpoints
{
    public static void MapCartsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/cart/change", Change);
    }

    private static async Task<CartResponse> Change(CartRequest data, AppDbContext db, HttpContext httpContext)
    {
        var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "id");
        var userId = int.Parse(userIdClaim!.Value);
        var cart = await db.Carts.FirstOrDefault(item => item.ProductId == data.ProductId);

        if (cart == null)
        {
            cart.ProductId = data.ProductId;
            cart.Quantity = data.Quantity;
            cart.
            
        }
    }
}