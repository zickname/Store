namespace Store.DTO.Carts;

public record CartRequest(
    int ProductId,
    int Quantity);