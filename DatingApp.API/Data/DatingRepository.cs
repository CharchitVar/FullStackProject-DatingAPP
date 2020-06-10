using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           var users = await _context.Users.Include(p=> p.Photos).ToListAsync();
           return users;
        }

        public  async Task<bool> SaveAll()
        {
            // I've made this condition >= 0 because if I'm removing something from profile and then adding would be considered as No Change and then it will trhow any on updation
            return await _context.SaveChangesAsync() >= 0 ;
        }

       public async  Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await  _context.Photos.Where(u =>u.UserId == userId ).FirstOrDefaultAsync( p => p.IsMain);
        }
    }
}