using System.ComponentModel.DataAnnotations;

namespace Store.DTOs.Products;

public record CreateProductRequest(
    [Required]
    string Name,
    
    [Required]
    double Price,
    
    List<int>? ImagesId = null);