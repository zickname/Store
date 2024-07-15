namespace Store.Entities;

public class Order
{
    public int Id { get; init; }

    public int UserId { get; set; }

    public double Amount { get; set; }

    public required string Address { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public List<OrderDetails> DetailsList { get; set; } = [];

    public Account User { get; set; } = null!;
}