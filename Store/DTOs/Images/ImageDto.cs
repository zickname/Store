using System.ComponentModel.DataAnnotations;

namespace Store.DTOs.Images;

public record ImageDto(
    int ImageId,
    
    [Required]
    string ImagePath);