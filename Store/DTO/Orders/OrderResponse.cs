using System.ComponentModel.DataAnnotations;
using Store.DTO.Accounts;
using Store.Models;

namespace Store.DTO.Orders;

public record OrderResponse(
    int Id,
    double TotalAmount,
    DateTime CreateDate,
    LoginResponse User);