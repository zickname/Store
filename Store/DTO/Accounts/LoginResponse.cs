namespace Store.DTO.Accounts;

public record LoginResponse(
    int Id,
    string Name,
    string FirstName,
    string LastName,
    string PhoneNumber);