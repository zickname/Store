using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTO.Carts;
using Store.Interfaces;
using Store.Models;
using Store.Services.Data;

namespace Store.Endpoints;

public static class CartEndpoints
{
    public static void MapCartsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/cart/change", Change)
            .RequireAuthorization();
    }

    private static async Task<Ok<List<CartItemsRequestResponse>>> Change(CartItemsRequestResponse data, AppDbContext db, CurrentAccount currentAccount)
    {
        var userId = currentAccount.GetUserIdFromClaim();
        
        var cartItem = await db.Carts.FirstOrDefaultAsync(
            item => item.ProductId == data.ProductId && item.UserId == userId);

        if (data.Quantity == 0 && cartItem != null)
        {
            db.Carts.Remove(cartItem);
            await db.SaveChangesAsync();
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

        var cartItems = await db.Carts
            .Where(user => user.UserId == userId)
            .Select(item => new CartItemsRequestResponse(
               item.ProductId,
               item.Quantity)).ToListAsync();

        return TypedResults.Ok(cartItems);
    }
}