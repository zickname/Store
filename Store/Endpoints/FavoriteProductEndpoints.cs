using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.FavoriteProducts;
using Store.DTOs.Images;
using Store.DTOs.Products;
using Store.Entities;
using Store.Interfaces;
using Store.Services.Data;

namespace Store.Endpoints;

public static class FavoriteProductEndpoints
{
    public static void MapFavoriteProductEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/favorite-products", Get);
        endpoints.MapPost("api/favorite-products/add", Add);
        endpoints.MapPost("api/favorite-products/remove", Remove);
    }

    private static async Task<Results<Ok<List<ProductDto>>, UnauthorizedHttpResult>> Get(
        ICurrentAccount account, AppDbContext db)
    {
        var userId = account.GetUserId();

        if (userId == null)
        {
            return TypedResults.Unauthorized();
        }

        var favoriteProducts = await db.FavoriteProducts
            .Where(favoriteProduct => favoriteProduct.UserId == userId)
            .Include(favoriteProduct => favoriteProduct.Product)
            .ThenInclude(product => product.Images)
            .Select(favoriteProduct => favoriteProduct.Product)
            .Select(product => new ProductDto(
                product.Id,
                product.Name,
                product.Price,
                product.Description,
                product.Images
                    .Select(image => new ImageDto(image.Id, image.ImagePath))
                    .ToList()
                )
            )
            .ToListAsync();

        return TypedResults.Ok(favoriteProducts);
    }

    private static async Task<Results<Ok, UnauthorizedHttpResult, NotFound<string>>> Remove(
        FavoriteProductsRequest favoriteProductsRequest,
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
                favoriteProduct.UserId == userId && favoriteProduct.ProductId == favoriteProductsRequest.Id)
            .FirstOrDefaultAsync();

        if (favoriteProduct == null)
        {
            return TypedResults.NotFound("Произошла ошибка");
        }

        db.FavoriteProducts.Remove(favoriteProduct);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok, UnauthorizedHttpResult>> Add(
        FavoriteProductsRequest favoriteProductsRequest,
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
            ProductId = favoriteProductsRequest.Id,
            UserId = (int)userId
        };

        db.FavoriteProducts.Add(favoriteProduct);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }
}