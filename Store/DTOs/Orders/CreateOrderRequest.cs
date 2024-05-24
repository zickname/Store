namespace Store.DTOs.Orders;

public record CreateOrderRequest(
    decimal TotalAmount,
    string Address,
    List<OrderDetailsDto> Products);