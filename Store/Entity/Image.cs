namespace Store.Entity;

public class Image
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? ProductId { get; set; }
    
    public string ImagePath { get; set; } = null!;

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    public Product Product { get; set; }
}