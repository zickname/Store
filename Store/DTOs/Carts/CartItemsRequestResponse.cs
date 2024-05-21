namespace Store.DTOs.Carts;

public record CartItemsRequestResponse(
    int ProductId,
    int Quantity);