namespace Store.Entities;

public class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public decimal Amount { get; set; }

    public string Address { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public List<OrderDetails> DetailsList { get; set; } = [];

    public Account User { get; set; } = null!;
}