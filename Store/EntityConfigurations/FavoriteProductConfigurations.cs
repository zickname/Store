using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entities;

namespace Store.EntityConfigurations;

public class FavoriteProductConfigurations : IEntityTypeConfiguration<FavoriteProduct>
{
    public void Configure(EntityTypeBuilder<FavoriteProduct> builder)
    {
        builder.ToTable("user_favorite_products", "store")
            .HasKey(favoriteProduct => favoriteProduct.Id);

        builder.Property(favoriteProduct => favoriteProduct.Id)
            .ValueGeneratedOnAdd();

        builder.Property(favoriteProduct => favoriteProduct.ProductId)
            .IsRequired();
        
        builder.Property(favoriteProduct => favoriteProduct.UserId)
            .IsRequired();

        builder.HasOne(favoriteProduct => favoriteProduct.User)
            .WithMany()
            .HasForeignKey(favoriteProduct => favoriteProduct.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(favoriteProduct => favoriteProduct.Product)
            .WithMany()
            .HasForeignKey(favoriteProduct => favoriteProduct.ProductId);
    }
}