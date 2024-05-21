using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entity;

namespace Store.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("products", "store");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .HasColumnName("id");
        
        builder.Property(p => p.Name)
            .HasColumnName("name")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(p => p.Price)
            .HasColumnName("price")
            .IsRequired();

        builder.Property(p => p.CreatedDate)
            .HasColumnName("create_date")
            .IsRequired();

        builder.Property(p => p.LastModifiedDate)
            .HasColumnName("last_modified_date");

        // builder.HasMany(p => p.Images)
        //     .WithOne()
        //     ;//.HasForeignKey(p => p.ProductId);
        //
        // //builder.HasOne(p => p.Carts)
        // //    .WithMany()
        //     ; //.HasForeignKey(p => p.Id);
    }
}