using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Store.DTOs.Accounts;

namespace Store.Validations;

public class ValidatorCreateAccount
{
    public IEnumerable<ValidationResult> Validate(CreateAccountRequest request)
    {
        if (!IsValidPhoneNumber(request.PhoneNumber))
        {
            yield return new ValidationResult(
                "Некорректный номер телефона",
                new[] { nameof(request.PhoneNumber) });
        }

        if (!IsValidName(request.FirstName))
        {
            yield return new ValidationResult(
                "Имя должно содержать от 2 до 20 символов и состоять только из букв английского или русского алфавита",
                new[] { nameof(request.FirstName) });
        }

        if (!IsValidName(request.LastName))
        {
            yield return new ValidationResult(
                "Фамилия должна содержать от 2 до 20 символов и состоять только из букв английского и русского",
                new[] { nameof(request.LastName) });
        }
        
        if (!IsValidPassword(request.Password))
        {
            yield return new ValidationResult(
                "Длина пароля от 8 до 16 символов (строчные, заглавные, цифры)",
                new[] { nameof(request.Password) });
        }
    }

    private bool IsValidPassword(string password)
    {
        const string pattern = @"^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':\\|,.<>\/?-]{8,}$";
        return Regex.IsMatch(password, pattern);
    }

    private bool IsValidPhoneNumber(string phoneNumber)
    {
        const string pattern = @"^(\d{1,3})(\d{3})(\d{7})$";
        
        var match = Regex.Match(phoneNumber, pattern);
        
        if (!match.Success)
        {
            return false;
        }

        var countryCode = int.Parse(match.Groups[1].Value);
        var operatorCode = int.Parse(match.Groups[2].Value);

        return CountryOperatorCodes.CountryCodes.Contains(countryCode)
               && CountryOperatorCodes.OperatorCodes.Contains(operatorCode);
    }

    private bool IsValidName(string name)
    {
        const string pattern = @"^[A-zА-я]+$";
        if (string.IsNullOrWhiteSpace(name))
            return false;

        return name.Length is >= 1 and <= 20 && Regex.IsMatch(name, pattern);
    }
}