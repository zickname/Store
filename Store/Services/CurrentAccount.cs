using Store.Interfaces;

namespace Store.Services;

public class CurrentAccount(IHttpContextAccessor httpContextAccessor) : ICurrentAccount
{
    public int GetUserId()
    {
        var userIdClaim = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "id")!;

        return int.Parse(userIdClaim.Value);
    }
}