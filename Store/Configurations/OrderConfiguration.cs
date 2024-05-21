using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entity;

namespace Store.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("orders", "store");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.UserId)
            .HasColumnName("users_id")
            .IsRequired();

        builder.Property(e => e.TotalAmount)
            .HasColumnName("amount")
            .IsRequired();

        builder.Property(e => e.Address)
            .HasColumnName("address")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(e => e.CreatedDate)
            .HasColumnName("create_date")
            .IsRequired();

        // builder.HasMany(e => e.Products)
        //     .WithOne(od => od.Order)
        //     .HasForeignKey(od => od.OrderId)
        //     .OnDelete(DeleteBehavior.Cascade);
        //
        // builder.HasOne(e => e.User)
        //     .WithMany(u => u.Orders)
        //     .HasForeignKey(e => e.UserId)
        //     .OnDelete(DeleteBehavior.Cascade);
    }
}