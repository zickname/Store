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
            .HasColumnName("users_id")
            .IsRequired();

        builder.Property(cart => cart.ProductId)
            .HasColumnName("products_id")
            .IsRequired();

        builder.Property(cart => cart.Quantity)
            .HasColumnName("quantity")
            .IsRequired();

        // builder.HasOne(cart => cart.User)
        //     .WithMany(cart => cart.Carts)
        //     .HasForeignKey(cart => cart.UserId)
        //     .OnDelete(DeleteBehavior.Cascade);

        // builder.HasMany(cart => cart.Products);
        // //.WithMany(p => p.Cart);
        // //.OnDelete(DeleteBehavior.Cascade);
    }
}