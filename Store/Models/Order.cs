using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Store.DTO.Orders;

namespace Store.Models;

[Table("orders", Schema = "store")]
public class Order
{
    [Required]
    public int Id { get; set; }
    
    [Required]
    public int UserId { get; set; }
    
    [Required]
    public decimal TotalAmount { get; set; }
    
    [MaxLength(200)]
    [Required]
    public string Address { get; set; } = null!;
    
    [Required]
    public List<OrderDetailsDto> Products { get; set; } = null!;

    [Required]
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    [Required]
    public Account User { get; set; } = new ();
}