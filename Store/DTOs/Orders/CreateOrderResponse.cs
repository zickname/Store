namespace Store.DTOs.Orders;

public record OrderCreateResponse(
    int Id,
    int UserId,
    DateTime CreateDate,
    string Address,
    List<OrderDetailsDto> Products,
    double TotalAmount
);