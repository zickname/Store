using Store.DTOs.Images;

namespace Store.DTOs.Products;

public record ProductDto(
    int Id,
    string Name,
    double Price,
    string? Description,
    List<ImageDto>? Images);