using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.Endpoints;
using Store.Models;
using Store.Services.Data;

var builder = WebApplication.CreateBuilder(args);

var connections = builder.Configuration.GetConnectionString("DefaultConnections")!;

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connections));

// builder.Services.AddAuthorization();
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             // указывает, будет ли валидироваться издатель при валидации токена
//             ValidateIssuer = true,
//             // строка, представляющая издателя
//             ValidIssuer = builder.Configuration["JWTSettings:Issuer"],
//             // будет ли валидироваться потребитель токена
//             ValidateAudience = true,
//             // установка потребителя токена
//             ValidAudience = builder.Configuration["JWTSettings:Issuer"],
//             // будет ли валидироваться время существования
//             ValidateLifetime = true,
//             // установка ключа безопасности
//             IssuerSigningKey = () => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:Key"])),
//             // валидация ключа безопасности
//             ValidateIssuerSigningKey = true,
//         }; 
//     });

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connections));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapProductEndpoints();
app.MapImageEndpoints();

// app.UseAuthentication();
// app.UseAuthorization();


app.Run();
//
// public class AuthOptions
// {
//     public const string ISSUER = "MyAuthServer"; // издатель токена
//     public const string AUDIENCE = "MyAuthClient"; // потребитель токена
//     const string KEY = "mysupersecret_secretsecretsecretkey!123";   // ключ для шифрации
//     public static SymmetricSecurityKey GetSymmetricSecurityKey() => 
//         new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
// }
