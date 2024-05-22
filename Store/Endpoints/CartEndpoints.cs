using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.Carts;
using Store.Entity;
using Store.Interfaces;
using Store.Services.Data;

namespace Store.Endpoints;

public static class CartEndpoints
{
    public static void MapCartsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/cart/change", Change)
            ; //.RequireAuthorization();
    }

    [Authorize]
    private static async Task<Ok<List<CartItemsRequestResponse>>> Change(CartItemsRequestResponse data, AppDbContext db, ICurrentAccount currentAccount)
    {
        var userId = currentAccount.GetUserId();

        var cartItem = await db.Carts.FirstOrDefaultAsync(
            item => item.ProductId == data.ProductId && item.UserId == userId);

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
        else if (data.Quantity == 0)
        {
            db.Carts.Remove(cartItem);
        }
        else
        {
            cartItem.Quantity = data.Quantity;
        }

        await db.SaveChangesAsync();

        var cartItems = await db.Carts
            .Where(user => user.UserId == userId)
            .Select(item => new CartItemsRequestResponse(
                item.ProductId,
                item.Quantity)).ToListAsync();

        return TypedResults.Ok(cartItems);
    }
}