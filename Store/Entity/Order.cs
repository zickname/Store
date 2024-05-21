namespace Store.Entity;

public class Order
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public decimal TotalAmount { get; set; }
    
    public string Address { get; set; } = null!;
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    public List<OrderDetails> Products { get; set; } = [];

    public Account User { get; set; } = new ();
}