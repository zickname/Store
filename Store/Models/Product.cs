using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models;

[Table("products", Schema = "public")]
public class Product
{
    [Column("id")]
    public int Id { get; set; }
    [Column("name")]
    [MaxLength(200)]
    public string Name { get; set; } = null!;
    [Column("price")]
    public double Price { get; set; }
    public List<Image?> Images { get; set; } = new();
    [Column("create_date")]
    public DateTime CreatedDate { get; set; }
    [Column("deleted_date")]
    public DateTime DeletedDate { get; set; }
    [Column("is_deleted")]
    public bool IsDeleted { get; set; }
    [Column("last_modified_date")]
    public DateTime? LastModifiedDate { get; set; }
}