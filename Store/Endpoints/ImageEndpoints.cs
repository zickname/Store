using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Store.Entities;
using Store.Services.Data;

namespace Store.Endpoints;

public static class ImageEndpoints
{
    public static void MapImageEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/image-upload", UploadImage)
            .DisableAntiforgery();
    }

    [Authorize]
    private static async Task<Results<Ok<int>, BadRequest<string>>> UploadImage(
        IFormFile file,
        IConfiguration configuration,
        IWebHostEnvironment environment,
        AppDbContext db)
    {
        if (!ValidateFileType(file.FileName))
        {
            return TypedResults.BadRequest("Неверный тип файла");
        }

        var extension = Path.GetExtension(file.FileName);
        var fileName = Guid.NewGuid() + extension;
        var filePath = GetOrCreateFilePath(fileName, environment, configuration);
        var filePathRelative = Path.GetRelativePath(environment.ContentRootPath, filePath);

        await using var fileStream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(fileStream);

        var image = new Image
        {
            Name = fileName,
            ProductId = null,
            ImagePath = filePathRelative,
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

    private static string GetOrCreateFilePath(string fileName, IHostEnvironment environment,
        IConfiguration configuration)
    {
        var directoryPath = Path.Combine(environment.ContentRootPath, configuration["FolderUploadImages"]!);

        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }

        return Path.Combine(directoryPath, fileName);
    }
}