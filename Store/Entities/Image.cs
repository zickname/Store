namespace Store.Entities;

public class Image
{
    public int Id { get; init; }

    public required string Name { get; set; }

    public int? ProductId { get; set; }

    public required string ImagePath { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public Product? Product { get; set; }
}