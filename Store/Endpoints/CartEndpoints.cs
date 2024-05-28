using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.Carts;
using Store.Entities;
using Store.Interfaces;
using Store.Services.Data;

namespace Store.Endpoints;

public static class CartEndpoints
{
    public static void MapCartsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/cart/change", Change);
    }

    [Authorize]
    private static async Task<Results<Ok<List<CartItemsDto>>, BadRequest<string>, UnauthorizedHttpResult>> Change(
        CartItemsDto data,
        AppDbContext db,
        ICurrentAccount currentAccount)
    {
        var userId = currentAccount.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var productExists = await db.Products.AnyAsync(product => product.Id == data.ProductId);
        if (!productExists)
            return TypedResults.BadRequest("Произошла ошибка при выполнении");
        
        var cartItem = await db.Carts.FirstOrDefaultAsync(
            item => item.ProductId == data.ProductId && item.UserId == userId);

        if (cartItem == null)
        {
            cartItem = new Cart
            {
                ProductId = data.ProductId,
                Quantity = data.Quantity,
                UserId = (int)userId
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
            .Select(item => new CartItemsDto(
                item.ProductId,
                item.Quantity)).ToListAsync();

        return TypedResults.Ok(cartItems);
    }
}