using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTO.Images;
using Store.Entities;
using Store.Services.Data;

namespace Store.Endpoints;

public static class ImageEndpoints
{
    public static void MapImageEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/image-upload", UploadImage)
            .DisableAntiforgery();

        endpoints.MapGet("api/image/{id:int}", GetById)
            .DisableAntiforgery()
            .WithOpenApi();
    }

    [Authorize]
    private static async Task<Results<PhysicalFileHttpResult, NotFound>> GetById(int id, AppDbContext db)
    {
        var imageResponse = await db.Images
            .Where(image => image.Id == id)
            .Select(image => new ImageDto(image.Id, image.ImagePath))
            .FirstOrDefaultAsync();

        if (imageResponse == null)
        {
            TypedResults.NotFound();
        }

        return TypedResults.PhysicalFile(imageResponse!.ImagePath, contentType: "image/*");
    }

    [Authorize]
    private static async Task<Results<Ok<int>, BadRequest<string>>> UploadImage(
        IFormFile file,
        IConfiguration configuration,
        AppDbContext db)
    {
        if (!ValidateFileType(file.FileName))
        {
            return TypedResults.BadRequest("Неверный тип файла");
        }

        var uploadImageFolderPath = configuration["UploadImageFolderPath"]!;
        var extension = Path.GetExtension(file.FileName);
        var fileName = Guid.NewGuid().ToString();
        var filePath = Path.Combine(uploadImageFolderPath, $"{fileName}{extension}");

        await using var fileStream = File.Create(filePath);

        await file.CopyToAsync(fileStream);

        var image = new Image
        {
            Name = fileName,
            ProductId = null,
            ImagePath = filePath,
            CreatedDate = DateTime.UtcNow
        };

        await db.Images.AddAsync(image);
        await db.SaveChangesAsync();

        return TypedResults.Ok(image.Id);
    }

    private static bool ValidateFileType(string fileName)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        return allowedExtensions.Contains(Path.GetExtension(fileName).ToLower());
    }
}