namespace Store.DTOs.Orders;

public record OrderDetailsDto(
    int ProductId,
    double Price,
    int Quantity);