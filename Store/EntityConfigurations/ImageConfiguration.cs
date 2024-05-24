using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entities;

namespace Store.Configurations;

public class ImageConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.ToTable("images", "store");

        builder.HasKey(image => image.Id);

        builder.Property(image => image.Id)
            .ValueGeneratedOnAdd();

        builder.Property(image => image.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(image => image.ImagePath)
            .HasMaxLength(250)
            .IsRequired();

        builder.Property(image => image.ProductId);

        builder.Property(image => image.CreatedDate)
            .IsRequired();

        builder.HasOne(image => image.Product)
            .WithMany(product => product.Images)
            .HasForeignKey(e => e.ProductId);
    }
}