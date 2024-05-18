using Store.DTO.Images;

namespace Store.DTO.Products;

public record ProductDto(
    int Id,
    string Name,
    double Price,
    List<ImageDto>? Images);