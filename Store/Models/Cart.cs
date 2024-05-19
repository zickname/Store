using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models;

[Table("carts", Schema = "store")]
public class Cart
{
    [Column("id")]
    public int Id { get; set; }

    [Column("users_id")]
    public int UserId { get; set; }

    [Column("products_id")]
    public int ProductId { get; set; }
    
    [Column("quantity")]
    public int Quantity { get; set; }

    public Account User { get; set; } = new();
    
    [Required]
    public List<Product> Products { get; } = []!;
}