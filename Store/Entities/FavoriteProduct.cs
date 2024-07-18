namespace Store.Entities;

public class FavoriteProduct
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int ProductId { get; set; }

    public AccountEntity User { get; set; } = null!;

    public Product Product { get; set; } = null!;
}