using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entity;

namespace Store.Configurations;

public class CartConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.ToTable("carts", "store");

        builder.HasKey(cart => cart.Id);

        builder.Property(cart => cart.UserId)
            .IsRequired();

        builder.Property(cart => cart.ProductId)
            .IsRequired();

        builder.Property(cart => cart.Quantity)
            .IsRequired();

        builder.HasOne(cart => cart.User)
            .WithMany(cart => cart.Carts)
            .HasForeignKey(cart => cart.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(cart => cart.Product)
        .WithMany(product => product.Carts)
        .HasForeignKey(cart => cart.ProductId)
        .OnDelete(DeleteBehavior.Cascade);
    }
}