namespace Store.Entity;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    
    public double Price { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public DateTime? LastModifiedDate { get; set; }
    
    public List<Image?> Images { get; } = [];

    public List<OrderDetails?> OrderDetailsList { get; set; } = [];

    public List<Cart?> Carts { get; set; } = [];

}