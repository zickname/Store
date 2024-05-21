namespace Store.DTOs.Orders;

public record CreateRequestOrder(
    decimal TotalAmount,
    string Address,
    List<OrderDetailsDto> Products);