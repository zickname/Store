using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Store.Entities;

namespace Store.Services.Data;

public class AppDbContext(IConfiguration configuration) : DbContext
{
    public DbSet<Account> Accounts => Set<Account>();

    public DbSet<Cart> Carts => Set<Cart>();
    
    public DbSet<Image> Images => Set<Image>();

    public DbSet<Product> Products => Set<Product>();

    public DbSet<Order> Orders => Set<Order>();

    public DbSet<OrderDetails> OrderDetails => Set<OrderDetails>();

    public DbSet<FavoriteProduct> FavoriteProducts => Set<FavoriteProduct>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(configuration.GetConnectionString("DefaultConnections"))
            .UseNpgsql().UseSnakeCaseNamingConvention()
            .LogTo(Console.WriteLine, LogLevel.Information);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}