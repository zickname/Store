using Store.DTO.Accounts;

namespace Store.DTO.Orders;

public record OrderDetails(
    int ProductId,
    double Price,
    int Quantity);
