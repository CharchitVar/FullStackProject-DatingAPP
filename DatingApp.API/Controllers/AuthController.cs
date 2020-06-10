using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO  userForRegister)
        {
            // validate request
            userForRegister.UserName = userForRegister.UserName.ToLower();

            if(await _repo.UserExists(userForRegister.UserName))
            return BadRequest("User Name already Present");
            var userToCreate = new User
            {
                UserName = userForRegister.UserName
            };

            var createdUser = await _repo.Register(userToCreate, userForRegister.Password);

           // return CreatedAtRoute()

           return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO userForLogin){
            var userFromRepo = await _repo.Login(userForLogin.userName.ToLower() , userForLogin.password);
            if(userFromRepo == null){
                return Unauthorized();

            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user =_mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new {
                token = tokenHandler.WriteToken(token),
                user
            });

        }
    }
}