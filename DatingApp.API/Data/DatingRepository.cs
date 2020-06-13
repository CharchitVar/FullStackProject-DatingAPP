using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
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

        public async Task<PagedList<User>> GetUsers(UsersParams usersParams)
        {
           var users =  _context.Users.Include(p=> p.Photos).OrderByDescending(u=>u.LastActive).AsQueryable();

            //For Excluding the current user who has logged in
           users = users.Where(u => u.Id != usersParams.UserId);

            // For only a particular Gender (Means what we have decided from the controller)
           users = users.Where(users=>users.Gender == usersParams.Gender);

           if(usersParams.MinAge !=18 || usersParams.MaxAge !=99){
               // minDOB--- min DOB user is looking for
               // maxDob -- Max Dob , user is looking for

               var minDob = DateTime.Today.AddYears(-usersParams.MaxAge - 1);
               var maxDob = DateTime.Today.AddYears(-usersParams.MinAge);
                 users= users.Where(user => user.DateOfBirth >= minDob && user.DateOfBirth <=  maxDob);
           }

           if(!string.IsNullOrEmpty(usersParams.OrderBy))
           {
               switch(usersParams.OrderBy)
               {
                   case "created":
                   users =users.OrderByDescending(u => u.CreatedAt);
                   break;
                   default:
                   users = users.OrderByDescending(u => u.LastActive);
                   break;
               }
           }

          
           return await PagedList<User>.CreateAsync(users,usersParams.PageNumber,usersParams.PageSize);
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