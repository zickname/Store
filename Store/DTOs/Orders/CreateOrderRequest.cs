using System.ComponentModel.DataAnnotations;

namespace Store.DTOs.Orders;

public record CreateOrderRequest(
    [Required]
    string Address,
    List<OrderDetailsDto> Products);