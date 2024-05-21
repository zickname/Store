using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Entity;

namespace Store.Configurations;

public class AccountConfigurations : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("accounts", schema:"store");

        builder.HasKey(a => a.Id);

        builder.HasIndex(a => a.PhoneNumber)
            .IsUnique();
        
        builder.Property(a => a.Id)
            .ValueGeneratedOnAdd()
            .HasColumnName("id");

        builder.Property(a => a.FirstName)
            .HasColumnName("first_name")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(a => a.LastName)
            .HasColumnName("last_name")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(a => a.PhoneNumber)
            .HasColumnName("phone_number")
            .HasMaxLength(20)
            .IsRequired();
        
        builder.Property(a => a.Password)
            .HasColumnName("password")
            .HasMaxLength(100)
            .IsRequired();
        
        // builder.HasMany(a => a.Carts)
        //     .WithOne(c => c.User)
        //     //.HasForeignKey(c => c.UserId)
        //     ;//.OnDelete(DeleteBehavior.Cascade);
        //
        // builder.HasMany(a => a.Orders)
        //     .WithOne(o => o.User)
        //     //.HasForeignKey(o => o.UserId)
        //     ;//.OnDelete(DeleteBehavior.Cascade);

    }
}