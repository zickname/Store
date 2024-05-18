namespace Store.DTO.Accounts;

public abstract record CreateAccountRequest(
    string PhoneNumber,
    string FirstName,
    string LastName,
    string Password);