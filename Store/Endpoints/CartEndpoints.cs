namespace Store.Endpoints;

public static class CartEndpoints
{
    public static void MapCartsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("dwad", ()=>"Awd");
        endpoints.MapPost("awdwa", ()=>"awdaw");

    }
}