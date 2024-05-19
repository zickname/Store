using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models;

[Table("order_details", Schema = "store")]
public class OrderDetails
{
    [Column("id")]
    public int Id { get; set; }
    
    [Column("order_id")]
    public int OrderId { get; set; }
    
    [Column("product_id")]
    public int ProductId { get; set; }
    
    [Column("price")]
    public double Price { get; set; }
    
    [Column("quantity")]
    public int Quantity { get; set; }
    
    public Order Order { get; set; } = null!;
    
    public Product Product { get; set; } = null!;
}