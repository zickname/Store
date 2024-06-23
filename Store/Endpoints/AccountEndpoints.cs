using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.DTOs.Accounts;
using Store.Entities;
using Store.Interfaces;
using Store.Services.Data;
using static BCrypt.Net.BCrypt;


namespace Store.Endpoints;

public static class AccountEndpoints
{
    public static void MapAccountsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("api/account/create", Create)
            .WithOpenApi();

        endpoints.MapPost("api/account/authenticate", Authenticate)
            .WithOpenApi();

        endpoints.MapDelete("account/delete/{id:int}", Delete)
            .WithOpenApi();
        endpoints.MapGet("api/account", GetAccountInfo);
    }

    private static async Task<Results<Ok<AccountDto>, UnauthorizedHttpResult>> GetAccountInfo(
        AppDbContext db,
        ICurrentAccount currentAccount)
    {
        var userId = currentAccount.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var account = await db.Accounts.FirstAsync(account => account.Id == userId);

        var accountDto = new AccountDto(
            account.PhoneNumber,
            account.FirstName,
            account.LastName);

        return TypedResults.Ok(accountDto);
    }

    private static async Task<Results<Ok, NotFound>> Delete(int id, AppDbContext db)
    {
        var account = await db.Accounts
            .Include(a => a.Orders)
            .Include(a => a.Carts)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (account == null)
        {
            return TypedResults.NotFound();
        }

        db.Accounts.Remove(account);
        await db.SaveChangesAsync();

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok<int>, BadRequest<string>, BadRequest<List<ValidationResult>>>> Create(
        CreateAccountRequest data,
        AppDbContext db,
        IConfiguration config)
    {
        var validationResults = data.Validate().ToList();

        if (validationResults.Count != 0)
        {
            return TypedResults.BadRequest(validationResults);
        }

        var account = await db.Accounts.FirstOrDefaultAsync(
            account => account.PhoneNumber == data.PhoneNumber);

        if (account != null)
        {
            return TypedResults.BadRequest("Пользователь уже зарегистрирован с данным номером");
        }

        var hashPassword = HashPassword(data.Password);

        var newAccount = new Account()
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            PhoneNumber = data.PhoneNumber,
            Password = hashPassword
        };

        await db.Accounts.AddAsync(newAccount);
        await db.SaveChangesAsync();

        return TypedResults.Ok(newAccount.Id);
    }


    private static async Task<Results<Ok<LoginResponse>, BadRequest<string>>> Authenticate(
        LoginRequest loginRequest,
        AppDbContext db,
        IConfiguration config)
    {
        var account = await db.Accounts.FirstOrDefaultAsync(
            account => account.PhoneNumber == loginRequest.PhoneNumber);

        if (account == null || !Verify(loginRequest.Password, account.Password))
        {
            return TypedResults.BadRequest("Не верный логин или пароль");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(config["JWTSettings:Key"]!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("id", account.Id.ToString()),
            }),
            Issuer = config["JWTSettings:Issuer"],
            Audience = config["JWTSettings:Audience"],
            Expires = DateTime.UtcNow.Add(TimeSpan.FromDays(365)),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        var response = new LoginResponse(tokenString);

        return TypedResults.Ok(response);
    }
}