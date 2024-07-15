using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.FavoriteProducts;
using Store.Entities;
using Store.Interfaces;
using Store.Services.Data;

namespace Store.Endpoints;

public static class FavoriteProductEndpoints
{
    public static void MapFavoriteProductEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/favorite-products", GetFavoriteProducts);
        endpoints.MapPost("api/add-item-favorites", AddItemFavorites);
        endpoints.MapPost("api/remove-item-favorites", RemoveItemFavorites);
    }

    private static async Task<Results<Ok<List<FavoriteProductDto>>, UnauthorizedHttpResult>> GetFavoriteProducts(
        ICurrentAccount account, AppDbContext db)
    {
        var userId = account.GetUserId();

        if (userId == null)
        {
            return TypedResults.Unauthorized();
        }

        var favoriteProducts = await db.FavoriteProducts
            .Where(favoriteProduct => favoriteProduct.UserId == userId)
            .Select(favoriteProduct => new FavoriteProductDto(
                favoriteProduct.Id,
                favoriteProduct.ProductId)).ToListAsync();

        return TypedResults.Ok(favoriteProducts);
    }

    private static async Task<Results<Ok, UnauthorizedHttpResult, NotFound<string>>> RemoveItemFavorites(
        FavoriteProductRequest favoriteProductRequest,
        ICurrentAccount account,
        AppDbContext db)
    {
        var userId = account.GetUserId();

        if (userId == null)
        {
            return TypedResults.Unauthorized();
        }

        var favoriteProduct = await db.FavoriteProducts
            .Where(favoriteProduct =>
                favoriteProduct.UserId == userId && favoriteProduct.ProductId == favoriteProductRequest.Id)
            .FirstOrDefaultAsync();

        if (favoriteProduct == null)
        {
            return TypedResults.NotFound("Произошла ошибка");
        }

        db.FavoriteProducts.Remove(favoriteProduct);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok, UnauthorizedHttpResult>> AddItemFavorites(
        FavoriteProductRequest favoriteProductRequest,
        ICurrentAccount account,
        AppDbContext db)
    {
        var userId = account.GetUserId();

        if (userId == null)
        {
            return TypedResults.Unauthorized();
        }

        var favoriteProduct = new FavoriteProduct
        {
            ProductId = favoriteProductRequest.Id,
            UserId = (int)userId
        };

        db.FavoriteProducts.Add(favoriteProduct);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }
}