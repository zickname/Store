namespace Store.DTO.Orders;

public record CreateRequestOrder(
    decimal TotalAmount,
    string Address,
    List<OrderDetailsDto> Products);