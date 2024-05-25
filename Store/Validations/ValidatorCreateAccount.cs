﻿using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Store.DTOs.Accounts;

namespace Store.Validations;

public class CreateAccountValidate
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
        const string pattern = @"^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':""\\|,.<>\/?-]{8,16}$";
        return Regex.IsMatch(password, pattern);
    }

    private bool IsValidPhoneNumber(string phoneNumber)
    {
        const string pattern = @"^(700|701|702|705|707|708|747|771|775|776|777|778)\d{7}$";
        return Regex.IsMatch(phoneNumber, pattern);
    }

    private bool IsValidName(string name)
    {
        const string pattern = @"^[A-zА-я]+$";
        if (string.IsNullOrWhiteSpace(name))
            return false;

        if (name.Length < 2 || name.Length > 20)
            return false;

        return Regex.IsMatch(name, pattern);
    }
}