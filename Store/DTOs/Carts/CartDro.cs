using Store.DTOs.Images;

namespace Store.DTOs.Carts;

public record CartDto(
    int ProductId,
    int Quantity,
    string Name,
    double Price,
    List<ImageDto>? Images);