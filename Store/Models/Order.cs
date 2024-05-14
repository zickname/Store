namespace Store.Models;

public class Order
{
    public int Id { get; set; }
    public decimal TotalAmount { get; set; }
    public string Address { get; set; } = null!;
    public List<OrderDetails> Products { get; set; } = null!;
    public DateTime CreatedDate { get; set; }
    public DateTime DeletedDate { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? LastModifiedDate { get; set; }
    public Account User { get; set; } = null!;
}