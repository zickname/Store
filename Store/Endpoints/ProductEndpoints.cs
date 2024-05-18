using Microsoft.EntityFrameworkCore;
using Store.DTO.Images;
using Store.DTO.Products;
using Store.Models;
using Store.Services.Data;

namespace Store.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("api/products", GetAll)
                .WithName("GetProducts")
                .WithOpenApi();

            endpoints.MapGet("api/product/{id:int}", GetById)
                .WithName("GetProduct")
                .WithOpenApi();

            endpoints.MapPost("api/products", Create)
                .WithName("AddProduct")
                .WithOpenApi();
            
            endpoints.MapPut("api/product/{id:int}", Update)
                .WithName("UpdateProduct")
                .WithOpenApi();
            
            endpoints.MapDelete("api/product/{id:int}", Delete)
                .WithName("DeleteProduct")
                .WithOpenApi();
        }

    private static async Task<IResult> Update(int id, CreateRequestProduct data, AppDbContext db)
    {
        var product = await db.Products.FindAsync(id);

        if (product == null)
            return Results.NotFound($"Товар с данным {id} не существует");

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

        return Results.Ok(product.Id);
        }

    private static async Task<IResult> Delete(int id, AppDbContext db)
    {
        var existingProduct = await db.Products.FindAsync(id);

        if (existingProduct == null)
        {
            return Results.NotFound($"Запись с таким {id} не найдена");
        }
        
        existingProduct.IsDeleted = true;
        existingProduct.DeletedDate = DateTime.UtcNow;

        db.Products.Update(existingProduct);

        await db.SaveChangesAsync();

        return Results.Ok();
    }

    private static async Task<IResult> Create(CreateRequestProduct createData, AppDbContext db)
    {
        var product = new Product
        {
            Name = createData.Name,
            Price = createData.Price,
        };

        await db.AddAsync(product);
        await db.SaveChangesAsync();

        if (createData.ImagesId != null)
        {
            product.Images.Clear();
            foreach (var id in createData.ImagesId)
            {
                var image = await db.Images.FindAsync(id);
                if (image != null)
                {
                    product.Images.Add(image);
                }
            }
        }

        await db.SaveChangesAsync();

        return Results.Ok(product.Id);
    }

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

    private static async Task<ProductDto?> GetById(int id, AppDbContext db)
    {
        return await db.Products
            .Where(product => product.Id == id)
            .Select(product => new ProductDto(
                product.Id,
                product.Name,
                product.Price,
                product.Images
                    .Select(image => new ImageDto(
                        image!.Id,
                        image.ImagePath))
                    .ToList()
            ))
            .FirstOrDefaultAsync();
    }
}
