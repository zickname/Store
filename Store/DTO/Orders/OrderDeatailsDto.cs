namespace Store.DTO.Orders;

public record OrderDetailsDto(
    int ProductId,
    double Price,
    int Quantity);