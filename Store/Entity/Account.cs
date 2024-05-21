namespace Store.Entity;

public class Account
{
    public int Id { get; init; }

    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public List<Cart?> Carts { get; set; } = [];
    
    public List<Order?> Orders { get; set; } = [];
}