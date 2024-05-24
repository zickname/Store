namespace Store.DTOs.Products;

public record CreateProductRequest(
    string Name,
    double Price,
    List<int>? ImagesId = null);