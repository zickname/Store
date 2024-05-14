using Microsoft.AspNetCore.Authorization;
using Store.DTO.Accounts;
using Store.Services.Data;

namespace Store.Endpoints;

public static class AccountEndpoints
{
    public static IEndpointRouteBuilder AccountsEndpoints(this IEndpointRouteBuilder app)
    {
        // app.MapPost("account/create", Create).WithOpenApi();
        // app.MapPost("account/delete", Delete).WithOpenApi();
        app.MapPost("account/authenticate", Authenticate).WithOpenApi();

        return app;
    }

    private static async Task<IResult> Authenticate(LoginRequest loginRequest, AppDbContext db)
    {
        var account = db.Accounts.FirstOrDefault(account => account.Login == loginRequest.Login);

        if (account == null) 
            return Results.BadRequest("");
        
        var responseDto = new LoginResponse(
            account.Id,
            account.FirstName,
            account.FirstName,
            account.LastName,
            account.PhoneNumber);

        return Results.Ok(responseDto);
    }
}