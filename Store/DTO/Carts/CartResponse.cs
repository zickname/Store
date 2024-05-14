using System.ComponentModel.DataAnnotations;

namespace Store.DTO.Carts;

public record CartResponse(
    [Required] Guid Id);