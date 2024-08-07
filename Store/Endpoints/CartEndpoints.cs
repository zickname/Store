﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Store.DTOs.Carts;
using Store.DTOs.Images;
using Store.Entities;
using Store.Interfaces;
using Store.Services.Data;

namespace Store.Endpoints;

public static class CartEndpoints
{
    public static void MapCartEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/cart", Get);
        endpoints.MapPost("api/cart/change", Change);
    }

    [Authorize]
    private static async Task<Results<Ok<List<CartDto>>, BadRequest<string>, UnauthorizedHttpResult>> Get(
        AppDbContext db,
        ICurrentAccount currentAccount)
    {
        var userId = currentAccount.GetUserId();
        
        if (userId == null)
            return TypedResults.Unauthorized();

        var cartItems = await db.Carts
            .Where(cart => cart.UserId == userId)
            .Select(cart => new CartDto(
                cart.ProductId,
                cart.Quantity,
                cart.Product.Name,
                cart.Product.Price,
                cart.Product.Images
                    .Select(image => new ImageDto(
                        image.Id,
                        image.ImagePath))
                    .ToList()))
            .ToListAsync();
        return TypedResults.Ok(cartItems);
    }

    [Authorize]
    private static async Task<Results<Ok<List<CartItemsDto>>, BadRequest<string>, UnauthorizedHttpResult>> Change(
        CartItemsDto data,
        AppDbContext db,
        ICurrentAccount currentAccount)
    {
        var userId = currentAccount.GetUserId();

        if (userId == null)
            return TypedResults.Unauthorized();

        var productExists = await db.Products.AnyAsync(product => product.Id == data.ProductId);

        if (!productExists)
            return TypedResults.BadRequest("Произошла ошибка при выполнении");

        var cartItem = await db.Carts.FirstOrDefaultAsync(
            item => item.ProductId == data.ProductId && item.UserId == userId);

        if (cartItem == null)
        {
            cartItem = new Cart
            {
                ProductId = data.ProductId,
                Quantity = data.Quantity,
                UserId = (int)userId
            };

            db.Carts.Add(cartItem);
        }
        else if (data.Quantity <= 0)
        {
            db.Carts.Remove(cartItem);
        }
        else
        {
            cartItem.Quantity = data.Quantity;
        }

        await db.SaveChangesAsync();

        var cartItems = await db.Carts
            .Where(user => user.UserId == userId)
            .Select(item => new CartItemsDto(
                item.ProductId,
                item.Quantity)).ToListAsync();

        return TypedResults.Ok(cartItems);
    }
}