using Microsoft.EntityFrameworkCore;
using Store.Models;
namespace Store.Services.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts { get; init; } = null!;
    public DbSet<Cart> Carts { get; init; } = null!;
    public DbSet<Image> Images { get; init; } = null!;
    public DbSet<Product> Products { get; init; } = null!;
    public DbSet<Order> Orders { get; init; } = null!;
}