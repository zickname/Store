using Store.DTO.Images;
using Store.Models;

namespace Store.DTO.Products;

public record ProductDto(
    int Id,
    string Name,
    double Price,
    List<ImageResponse> Images);