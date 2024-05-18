using Store.DTO.Accounts;

namespace Store.DTO.Orders;

public record OrderDetails(
    int Id,
    int OrderId,
    int ProductId,
    double Price,
    int Quantity,
    DateTime CreateDate,
    LoginResponse User,
    string Address);
