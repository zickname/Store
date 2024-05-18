using System.ComponentModel.DataAnnotations;
using Store.DTO.Products;

namespace Store.DTO.Carts;

public record CartResponse(
    List<ProductDto> Products);