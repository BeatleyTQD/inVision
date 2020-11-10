using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using inVision.Models;
using inVision.Repositories;
using System.Security.Claims;

namespace inVision.Controllers
{
    [Authorize]
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
            return Ok(_dreamRepository.GetActiveDreams(user.Id));
        }

        [HttpGet("Inactive")]
        public IActionResult GetInactive()
        {
            UserProfile user = GetCurrentUserProfile();
            return Ok(_dreamRepository.GetInactiveDreams(user.Id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            UserProfile user = GetCurrentUserProfile();

            var dream = _dreamRepository.GetById(id);
            if (dream == null)
            {
                return NotFound();
            }

            if (dream.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            return Ok(dream);
        }

        [HttpGet("OthersDream/{id}")]
        public IActionResult GetOthersDream(int id)
        {
            var othersDream = _dreamRepository.GetOthersDream(id);
            if (othersDream == null)
            {
                return NotFound();
            }

            return Ok(othersDream);
        }


        [HttpPost]
        public IActionResult Post(Dream dream)
        {
            _dreamRepository.Add(dream);
            return CreatedAtAction("Get", new { id = dream.Id }, dream);
        }

        [HttpPut("{id}")]
        public IActionResult Delete(int id)
        {
            //wont let you hard code to delete someone else's dream, but doesn't make user aware, need to add in clarifying alert later
            UserProfile user = GetCurrentUserProfile();
            _dreamRepository.DeactivateDream(id, user.Id);
            return NoContent();
        }

        
        [HttpPut("{id}")]
        public IActionResult Reactivate(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            _dreamRepository.ReactivateDream(id, user.Id);
            return NoContent();
        }
        
    }
}
