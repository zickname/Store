using Microsoft.EntityFrameworkCore;
using Store.DTO.Images;
using Store.Models;
using Store.Services.Data;

namespace Store.Endpoints;

public static class ImageEndpoints
{
    public static void MapImageEndpoints (this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/image-upload", UploadImage)
            .DisableAntiforgery();

        endpoints.MapGet("api/image/{id:int}", GetById)
            .DisableAntiforgery()
            .WithOpenApi();
    }

    private static async Task<IResult> GetById(int id, AppDbContext db)
    {
        var imageResponse = await db.Images
            .Where(image => image.Id == id)
            .Select(image => new ImageResponse(image.Id, image.ImagePath))
            .FirstOrDefaultAsync();
        return Results.File(imageResponse!.ImagePath, contentType:"image/*");
    }

    private static async Task<IResult> UploadImage(IFormFile file, IConfiguration configuration, AppDbContext db)
    {
        if (!ValidateFileType(file.FileName))
        {
            return Results.BadRequest("Неверный тип файла");
        }

        var uploadImageFolderPath = configuration["UploadImageFolderPath"]!;
        var guid = Guid.NewGuid();
        var uniqueFileName = $"{guid.ToString()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadImageFolderPath, uniqueFileName);

        await using var fileStream = File.Create(filePath);
        
        await file.CopyToAsync(fileStream);
        
        var image = new Image
        {
            Name = guid,
            ProductId = null,
            ImagePath = filePath,
            CreatedDate = DateTime.UtcNow
        };

        await db.Images.AddAsync(image);
        await db.SaveChangesAsync();

        return Results.Ok(image.Id);
    }

    private static bool ValidateFileType(string fileName)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        return allowedExtensions.Contains(Path.GetExtension(fileName).ToLower());
    }
    
}