using Microsoft.EntityFrameworkCore;
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

    private static async Task<IResult> Change(CartItemsRequestResponse data, AppDbContext db, HttpContext httpContext)
    {
        var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "id");
        var userId = int.Parse(userIdClaim!.Value);
        
        var cartItem = await db.Carts.SingleOrDefaultAsync(
            item => item.ProductId == data.ProductId && item.UserId == userId);

        if (data.Quantity == 0)
        {
            if (cartItem != null)
            {
                db.Carts.Remove(cartItem);
                await db.SaveChangesAsync();
            }
        }

        if (cartItem == null)
        {
            cartItem = new Cart
            {
                ProductId = data.ProductId,
                Quantity = data.Quantity,
                UserId = userId
            };
            db.Carts.Add(cartItem);
        }

        cartItem.Quantity = data.Quantity;

        await db.SaveChangesAsync();

        var cartItems = db.Carts
            .Where(user => user.UserId == userId)
            .Select(item => new CartItemsRequestResponse(
               item.ProductId,
               item.Quantity)).ToList();

        return Results.Ok(cartItems);
    }
}