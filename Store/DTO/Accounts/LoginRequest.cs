namespace Store.DTO.Accounts;

public abstract record LoginRequest(string PhoneNumber, string Password);