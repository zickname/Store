using Microsoft.EntityFrameworkCore;
using Store.Models;
namespace Store.Services.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts { get; init; }
    public DbSet<Cart> Carts { get; init; }
    public DbSet<Image> Images { get; init; }
    public DbSet<Product> Products { get; init; }
    public DbSet<Order> Orders { get; init; }
}