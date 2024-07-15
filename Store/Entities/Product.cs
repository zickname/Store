namespace Store.Entities;

public class Product
{
    public int Id { get; init; }

    public required string Name { get; set; }

    public required double Price { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public DateTime? LastModifiedDate { get; set; }

    public List<Image> Images { get; } = [];
}