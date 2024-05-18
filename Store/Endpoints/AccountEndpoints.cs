using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.DTO.Accounts;
using Store.Models;
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
        // app.MapPost("account/delete", Delete).WithOpenApi();
    }

    private static async Task<IResult> Create(CreateAccountRequest data, AppDbContext db, IConfiguration config)
    {
        var account = await db.Accounts.SingleOrDefaultAsync(
            account => account.PhoneNumber == data.PhoneNumber);

        if (account != null)
        {
            return Results.Ok("Пользователь уже зарегистрирован с данным номером");
        }

        var hashedPassword = HashPassword(data.Password);

        var newAccount = new Account()
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            PhoneNumber = data.PhoneNumber,
            Password = hashedPassword
        };

        await db.Accounts.AddAsync(newAccount);
        await db.SaveChangesAsync();

        return Results.Ok(newAccount.Id);
    }


    private static async Task<IResult> Authenticate(LoginRequest loginRequest, AppDbContext db, IConfiguration config)
    {
        var account = await db.Accounts.SingleOrDefaultAsync(
            account => account.PhoneNumber == loginRequest.PhoneNumber);
        
        if (account == null || !Verify(loginRequest.Password, account.Password))
        {
            return Results.Unauthorized();
        }
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(config["Jwt:Key"]!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("id", account.Id.ToString()),
            }),
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(config["Jwt:ExpiresInMinutes"]!)),
            Issuer = config["Jwt:Issuer"],
            Audience = config["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        var loginResponse = new LoginResponse(
            account.Id,
            account.FirstName,
            account.LastName,
            account.PhoneNumber);

        return Results.Ok(new { Token = tokenString, User = loginResponse });
        
    }
}