using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models;

[Table("images", Schema = "store")]
public class Image
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [MaxLength(200)]
    public string Name { get; set; } = null!;
    
    [ForeignKey(nameof(Product.Id))]
    [Column("product_id")]
    public int? ProductId { get; set; }
    
    [Column("image_path")]
    [MaxLength(250)]
    public string ImagePath { get; set; } = null!;
    
    [Column("create_date")]
    public DateTime CreatedDate { get; set; }
}