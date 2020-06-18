using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        Task<PagedList<User>> GetUsers(UsersParams usersParams);

        Task<User> GetUser(int id);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        // For Like Functionality

        Task<Like> GetLike(int userId, int recipientId);


        // To Get the Single Message from the data base
        Task<Message> GetMessage(int id);

        // used for getting the inbox , outbox for the user
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);


        // For the combination of chat (message chat)
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        

    }
}