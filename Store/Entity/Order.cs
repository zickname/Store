namespace Store.Entity;

public class Order
{
    public int Id { get; set; }
    
    public required int UserId { get; set; }
    
    public required decimal Amount { get; set; }
    
    public required string Address { get; set; }
    
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    public List<OrderDetails> DetailsList { get; set; } = [];

    public Account? User { get; set; }
}