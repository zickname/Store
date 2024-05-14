namespace Store.Endpoints;

public static class OrderEndpoints
{
    public static void MapOrderEndpoints (this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("Awdwad", ()=> "da");
        endpoints.MapPost("awdwa", ()=> "ada");

    }
    
}