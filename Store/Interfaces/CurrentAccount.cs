namespace Store.Interfaces;

public class CurrentAccount(IHttpContextAccessor httpContextAccessor) : ICurrentAccount
{
    public int GetUserIdFromClaim()
    {
        var userIdClaim = httpContextAccessor.HttpContext!.User.Claims.FirstOrDefault(c => c.Type == "id")!;
        
        return int.Parse(userIdClaim.Value);
    }
}