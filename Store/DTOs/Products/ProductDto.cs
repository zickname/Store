using Store.DTOs.Images;

namespace Store.DTOs.Products;

public record ProductDto(
    int Id,
    string Name,
    double Price,
    List<ImageDto>? Images);