namespace Store.Entities;

public class Account
{
    public int Id { get; init; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Password { get; set; }

    public required string PhoneNumber { get; set; }

    public List<Cart?> Carts { get; set; } = [];

    public List<Order>? Orders { get; set; } = [];
}