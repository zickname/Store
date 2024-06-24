namespace Store.DTOs.Orders;

public record OrderDetailsRequest(
    int ProductId,
    double Price,
    int Quantity);