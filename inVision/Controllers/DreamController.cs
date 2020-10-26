using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using inVision.Models;
using inVision.Repositories;
using System.Security.Claims;

namespace inVision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DreamController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IDreamRepository _dreamRepository;

        public DreamController(IUserProfileRepository userProfileRepository, IDreamRepository dreamRepository)
        {
            _userProfileRepository = userProfileRepository;
            _dreamRepository = dreamRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;
            return Ok(_dreamRepository.GetActiveDreams(userId));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;

            var dream = _dreamRepository.GetById(id);
            if (dream == null)
            {
                return NotFound();
            }

            if (dream.UserProfileId != userId)
            {
                return Unauthorized();
            }

            return Ok(dream);
        }

        [HttpPost]
        public IActionResult Post(Dream dream)
        {
            _dreamRepository.Add(dream);
            return CreatedAtAction("Get", new { id = dream.Id }, dream);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //wont let you hard code to delete someone else's dream, but doesn't make user aware, need to add in clarifying alert later
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;
            _dreamRepository.DeactivateDream(id, userId);
        }
    }
}
