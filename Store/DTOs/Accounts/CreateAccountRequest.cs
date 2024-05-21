namespace Store.DTOs.Accounts;

public record CreateAccountRequest(
    string PhoneNumber,
    string FirstName,
    string LastName,
    string Password);