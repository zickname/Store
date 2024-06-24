namespace Store.DTOs.Orders;

public record CreateOrderResponse(
    int Id,
    int UserId,
    DateTime CreateDate,
    string Address,
    List<OrderDetailsRequest> Products,
    double TotalAmount
);