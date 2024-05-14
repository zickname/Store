using Store.DTO.Accounts;
using Store.DTO.Products;
using Store.Models;

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
