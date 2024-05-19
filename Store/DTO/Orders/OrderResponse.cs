using Store.DTO.Accounts;

namespace Store.DTO.Orders;

public record OrderResponse(
    int Id,
    int UserId,
    DateTime CreateDate,
    string Address,
    List<OrderDetailsDto> Products,
    decimal TotalAmount
    );