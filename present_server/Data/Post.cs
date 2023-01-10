using Microsoft.AspNetCore.Components.Forms;
using System.ComponentModel.DataAnnotations;

namespace present_server.Data
{
    //internal only available in this project
    // sealed it can be inherited from
    internal sealed class Car
    {
        [Key]
        public int CarId { get; set; }


        [Required]
        [MaxLength(255)]
        public string CarBrand { get; set; } = string.Empty;


        [Required]
        [MaxLength(100000)]
        public string CarModel { get; set; } = string.Empty;


        [Required]
        [MaxLength(100)]
        public int CarYear { get; set; }


        [Required]
        [MaxLength(100000)]
        public string CarDescription { get; set; } = string.Empty;


        [MaxLength(100000)]
        public string CarImgUrl { get; set; } = string.Empty;
   

    }
}
