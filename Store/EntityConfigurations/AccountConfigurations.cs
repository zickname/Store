using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entities;

namespace Store.Configurations;

public class AccountConfigurations : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("accounts", schema: "store");

        builder.HasKey(account => account.Id);

        builder.HasIndex(account => account.PhoneNumber)
            .IsUnique();

        builder.Property(account => account.Id)
            .ValueGeneratedOnAdd();

        builder.Property(account => account.FirstName)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(account => account.LastName)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(account => account.PhoneNumber)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(account => account.Password)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasMany(account => account.Carts)
            .WithOne(cart => cart.User)
            .HasForeignKey(cart => cart.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(account => account.Orders)
            .WithOne(order => order.User)
            .HasForeignKey(order => order.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}