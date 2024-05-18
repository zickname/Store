using System.ComponentModel.DataAnnotations;

namespace Store.Models;

public class Order
{
    [Required]
    public int Id { get; set; }
    
    public decimal TotalAmount { get; set; }
    
    [MaxLength(200)]
    [Required]
    public string Address { get; set; } = null!;
    
    [Required]
    public List<OrderDetails> Products { get; set; } = null!;
    
    [Required]
    public DateTime CreatedDate { get; set; }

    public DateTime? DeletedDate { get; set; }
    
    [Required]
    public bool IsDeleted { get; set; }
    
    public DateTime? LastModifiedDate { get; set; }
    
    [Required]
    public Account User { get; set; } = null!;
}