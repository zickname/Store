using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entity;

namespace Store.Configurations;

public class ImageConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.ToTable("images", "store");

        builder.HasKey(e => e.Id);

        builder.Property(i => i.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(e => e.Name)
            .HasColumnName("name")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(e => e.ImagePath)
            .HasColumnName("image_path")
            .HasMaxLength(250)
            .IsRequired();

        builder.Property(e => e.ProductId)
            .HasColumnName("product_id");

        builder.Property(e => e.CreatedDate)
            .HasColumnName("created_date")
            .IsRequired();

        // builder.HasOne<Product>()
        //     .WithMany(p => p.Images)
        //     .HasForeignKey(e => e.ProductId);
    }
}