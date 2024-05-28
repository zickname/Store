using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.Images;
using Store.DTOs.Products;
using Store.Entities;
using Store.Services.Data;

namespace Store.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/products", GetAll)
            .WithName("GetProducts")
            .WithOpenApi();

        endpoints.MapGet("api/products/{id:int}", GetById)
            .WithName("GetProduct")
            .WithOpenApi();

        endpoints.MapPost("api/products/create", Create)
            .WithName("AddProduct")
            .WithOpenApi();

        endpoints.MapPut("api/products/{id:int}", Update)
            .WithName("UpdateProduct")
            .WithOpenApi();

        endpoints.MapDelete("api/products/{id:int}", Delete)
            .WithName("DeleteProduct")
            .WithOpenApi();
    }

    [Authorize]
    private static async Task<Results<Ok<int>, NotFound<string>>> Update(int id, CreateProductRequest data,
        AppDbContext db)
    {
        var product = await db.Products.FindAsync(id);

        if (product == null)
            return TypedResults.NotFound("Произошла ошибка");

        product.Name = data.Name;
        product.Price = data.Price;
        product.LastModifiedDate = DateTime.UtcNow;

        if (data.ImagesId != null)
        {
            product.Images.Clear();

            foreach (var imageId in data.ImagesId)
            {
                var image = await db.Images.FindAsync(imageId);

                if (image != null)
                {
                    product.Images.Add(image);
                }
            }
        }

        db.Products.Update(product);

        await db.SaveChangesAsync();

        return TypedResults.Ok(product.Id);
    }

    [Authorize]
    private static async Task<Results<Ok, NotFound<string>>> Delete(int id, AppDbContext db)
    {
        var existingProduct = await db.Products.FindAsync(id);

        if (existingProduct == null)
        {
            return TypedResults.NotFound("Произошла ошибка");
        }

        db.Products.Update(existingProduct);

        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }

    [Authorize]
    private static async Task<Ok<int>> Create(CreateProductRequest data, AppDbContext db)
    {
        var product = new Product
        {
            Name = data.Name,
            Price = data.Price,
        };

        await db.AddAsync(product);
        await db.SaveChangesAsync();

        if (data.ImagesId != null)
        {
            product.Images.Clear();
            foreach (var id in data.ImagesId)
            {
                var image = await db.Images.FindAsync(id);
                if (image != null)
                {
                    product.Images.Add(image);
                }
            }
        }

        await db.SaveChangesAsync();

        return TypedResults.Ok(product.Id);
    }

    [Authorize]
    private static async Task<List<ProductDto>> GetAll(AppDbContext db)
    {
        return await db.Products
            .Select(product => new ProductDto(
                product.Id,
                product.Name,
                product.Price,
                product.Images
                    .Select(image => new ImageDto(
                        image!.Id,
                        image.ImagePath))
                    .ToList()))
            .ToListAsync();
    }

    [Authorize]
    private static async Task<Results<Ok<ProductDto>, BadRequest<string>>> GetById(int id, AppDbContext db)
    {
        var product = await db.Products
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return TypedResults.BadRequest("Произошла ошибка");
        }
        
        var productDto = new ProductDto(
            product.Id,
            product.Name,
            product.Price,
            product.Images
                .Select(image => new ImageDto(
                    image!.Id,
                    image.ImagePath))
                .ToList()
        );

        return TypedResults.Ok(productDto);
    }
}