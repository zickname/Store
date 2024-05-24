using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entities;

namespace Store.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("orders", "store");

        builder.HasKey(order => order.Id);

        builder.Property(order => order.UserId)
            .IsRequired();

        builder.Property(order => order.Amount)
            .IsRequired();

        builder.Property(order => order.Address)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(order => order.CreatedDate)
            .IsRequired();

        builder.HasMany(order => order.DetailsList)
            .WithOne(orderDetails => orderDetails.Order)
            .HasForeignKey(orderDetails => orderDetails.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(order => order.User)
            .WithMany(account => account.Orders)
            .HasForeignKey(order => order.UserId);
    }
}