using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        // This class is used for serialize the JSON  Data so that we can seed that into Database

        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var UserData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(UserData);

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePassWordHash("password", out passwordHash, out passwordSalt);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();
                    context.Users.Add(user);


                }

                context.SaveChanges();
            }
        }

        private static void CreatePassWordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}