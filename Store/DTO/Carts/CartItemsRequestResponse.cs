namespace Store.DTO.Carts;

public record CartItemsRequestResponse(
    int ProductId,
    int Quantity);