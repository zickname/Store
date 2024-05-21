using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entity;

namespace Store.Configurations;

public class OrderDetailsConfiguration : IEntityTypeConfiguration<OrderDetails>
{
    public void Configure(EntityTypeBuilder<OrderDetails> builder)
    {
        builder.ToTable("order_details", "store");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnName("id");
        
        builder.Property(e => e.OrderId)
            .HasColumnName("orders_id")
            .IsRequired();

        builder.Property(e => e.ProductId)
            .HasColumnName("products_id")
            .IsRequired();

        builder.Property(e => e.Price)
            .HasColumnName("products_price")
            .IsRequired();

        builder.Property(e => e.Quantity)
            .HasColumnName("quantity")
            .IsRequired();

        // builder.HasOne(e => e.Order)
        //     .WithMany(o => o.Products)
        //     .HasForeignKey(e => e.OrderId)
        //     .OnDelete(DeleteBehavior.Cascade);
        //
        // builder.HasOne(e => e.Products)
        //     .WithMany()
        //     .HasForeignKey(e => e.ProductId)
        //     .OnDelete(DeleteBehavior.Cascade);
    }
}