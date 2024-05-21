using Microsoft.EntityFrameworkCore;
using Store.Endpoints;
using Store.Extensions.Jwt;
using Store.Interfaces;
using Store.Services;
using Store.Services.Data;

var builder = WebApplication.CreateBuilder(args);

var connections = builder.Configuration.GetConnectionString("DefaultConnections")!;

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentAccount, CurrentAccount>();

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connections));


builder.Services.AddJwtAuthentication(builder.Configuration);
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
app.MapAccountsEndpoints();
app.MapCartsEndpoints();
app.MapOrderEndpoints();

//TODO Если есть header Autorization, то просто в консоль записать есть или нету.

// app.UseAuthentication();
// app.UseAuthorization();


app.Run();
