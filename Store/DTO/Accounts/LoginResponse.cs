namespace Store.DTO.Accounts;

public record LoginResponse(
    int Id,
    string FirstName,
    string LastName,
    string PhoneNumber);