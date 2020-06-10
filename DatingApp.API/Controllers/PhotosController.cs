using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {

        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;

        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        //IOptions is used to inject the cludinary setting data here
        public PhotosController(IDatingRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _mapper = mapper;
            _repository = repository;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repository.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotosForUser(int userId, [FromForm] PhotoForCreationDto photoForCreation)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userFromRepo = await _repository.GetUser(userId);

            var file = photoForCreation.File;

            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    // upload Result -- It will store the response from the Cloudinary
                    uploadResult = _cloudinary.Upload(uploadParams);

                }
            }
            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreation);

            if (!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            userFromRepo.Photos.Add(photo);

            if (await _repository.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not Upload the Photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _repository.GetPhoto(id);

            if (photoFromRepo.IsMain)

                return BadRequest("This is already a Main photo");

            var currentMainPhoto = await _repository.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if (await _repository.SaveAll())
                return NoContent();

            return BadRequest("Could not Photo as Main");


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userid, int id)
        {
            if (userid != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userid);
            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _repository.GetPhoto(id);

            if (photoFromRepo.IsMain)

                return BadRequest("You can not delete your main Photo");

            if (photoFromRepo.PublicID != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicID);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    _repository.Delete(photoFromRepo);
                }


            }
            if (photoFromRepo.PublicID == null)
            {
                _repository.Delete(photoFromRepo);
            }

            if (await _repository.SaveAll())
            {
                return Ok();
            }
            else
            {
                return BadRequest("Failed to delete");
            }



        }

    }
}