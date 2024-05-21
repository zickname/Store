using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Store.Entity;

namespace Store.Services.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts { get; init; }
    public DbSet<Cart> Carts { get; init; } = null!;
    public DbSet<Image> Images { get; init; } = null!;
    public DbSet<Product> Products { get; init; } = null!;
    public DbSet<Order> Orders { get; init; } = null!;
    public DbSet<OrderDetails> OrderDetails { get; init; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}

