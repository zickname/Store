using System.ComponentModel.DataAnnotations;
using Store.Validations;

namespace Store.DTOs.Accounts;

public record LoginRequest(string PhoneNumber, string Password);