using Store.DTO.Accounts;

namespace Store.DTO.Orders;

public record OrderResponse(
    int Id,
    double TotalAmount,
    DateTime CreateDate,
    LoginResponse User);