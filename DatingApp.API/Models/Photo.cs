using System;

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }

//This public Id will get the value from the cloudinary when the image gets saved there
        public string PublicID { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public string Description { get; set; }
    }
}