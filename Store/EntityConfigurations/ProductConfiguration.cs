using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entities;

namespace Store.EntityConfigurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("products", "store");

        builder.HasKey(product => product.Id);

        builder.Property(product => product.Id);
        
        builder.Property(product => product.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(product => product.Price)
            .IsRequired();

        builder.Property(product => product.Description)
            .HasMaxLength(1500);

        builder.Property(product => product.CreatedDate)
            .IsRequired();

        builder.Property(product => product.LastModifiedDate);

        builder.HasMany(product => product.Images)
            .WithOne(image => image.Product)
            .HasForeignKey(image => image.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        
    }
}