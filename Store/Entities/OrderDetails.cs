﻿namespace Store.Entities;

public class OrderDetails
{
    public int Id { get; init; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public double Price { get; set; }

    public int Quantity { get; set; }

    public Order Order { get; set; } = null!;

    public Product Product { get; set; } = null!;
}