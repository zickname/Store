using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entities;

namespace Store.Configurations;

public class OrderDetailsConfiguration : IEntityTypeConfiguration<OrderDetails>
{
    public void Configure(EntityTypeBuilder<OrderDetails> builder)
    {
        builder.ToTable("order_details", "store");

        builder.HasKey(orderDetails => orderDetails.Id);

        builder.Property(orderDetails => orderDetails.Id);
        
        builder.Property(orderDetails => orderDetails.OrderId)
            .IsRequired();

        builder.Property(orderDetails => orderDetails.ProductId)
            .IsRequired();

        builder.Property(orderDetails => orderDetails.Price)
            .IsRequired();

        builder.Property(orderDetails => orderDetails.Quantity)
            .IsRequired();

        builder.HasOne(orderDetails => orderDetails.Order)
            .WithMany(order => order.DetailsList)
            .HasForeignKey(orderDetails => orderDetails.OrderId);

        builder.HasOne(orderDetails => orderDetails.Product)
            .WithMany(product => product.OrderDetailsList)
            .HasForeignKey(e => e.ProductId);
    }
}