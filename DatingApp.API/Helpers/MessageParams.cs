namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        private const int MaxPerSize = 50;

        public int PageNumber { get; set; } = 1;

        private int pageSize =10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPerSize) ? MaxPerSize : value; }
        }

        public int UserId { get; set; } 

        public string MessageContainer { get; set; } ="Unread";
    }
}