using System;

namespace DatingApp.API.Dtos
{
    public class MessageToReturnDto
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        // auto mapper will map the known as property of the user to senderKnownAs automatically
        public string SenderKnownAs { get; set; }

       
        public string SenderPhotoUrl { get; set; } 

        public int RecipientId { get; set; }

         //auto mapper will map the known as property of the user to recipientKnownAs automatically
        public string RecipientKnownAs { get; set; }

        public string RecipientPhotoUrl { get; set; } 

        public string Content { get; set; }

        public bool IsRead { get; set; }

        public DateTime? DateRead { get; set; }

        public DateTime? MessageSent { get; set; }
    }
}