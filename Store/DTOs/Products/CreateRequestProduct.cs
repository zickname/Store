namespace Store.DTOs.Products;

public record CreateRequestProduct(
    string Name,
    double Price,
    List<int>? ImagesId = null);