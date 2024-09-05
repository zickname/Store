using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
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

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization Bearer",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});


builder.Services.AddCors(options =>
    options.AddPolicy("AllowSpecificOrigin", policyBuilder => policyBuilder
        .WithOrigins("http://localhost:4200")
        .AllowAnyOrigin()
        .AllowAnyHeader()));

builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAuthorization();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentAccount, CurrentAccount>();

builder.Services.AddDbContext<AppDbContext>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "static")),
    RequestPath = "/static"
});

app.MapProductEndpoints();
app.MapImageEndpoints();
app.MapAccountEndpoints();
app.MapCartEndpoints();
app.MapOrderEndpoints();
app.MapFavoriteProductEndpoints();

app.UseAuthentication();
app.UseAuthorization();


app.Run();
