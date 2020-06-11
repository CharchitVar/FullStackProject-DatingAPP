using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDTO
    {
        [Required]
        public string UserName {get; set;}

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage="You must specify Password between 4 and 8 character")]
        public string Password {get; set;}

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }


        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastActive { get; set; }

        public UserForRegisterDTO()
        {
            CreatedAt = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}