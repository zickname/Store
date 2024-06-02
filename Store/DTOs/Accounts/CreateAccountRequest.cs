using System.ComponentModel.DataAnnotations;
using Store.Validations;

namespace Store.DTOs.Accounts;

public record CreateAccountRequest(
    string PhoneNumber,
    string FirstName,
    string LastName,
    string Password)

{
    public IEnumerable<ValidationResult> Validate()
    {
        var validator = new ValidatorCreateAccount();
        return validator.Validate(this);
    }
}