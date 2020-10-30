using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using inVision.Models;
using inVision.Repositories;
using System.Security.Claims;


namespace inVision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HowController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IHowRepository _howRepository;

        public HowController(IUserProfileRepository userProfileRepository, IHowRepository howRepository)
        {
            _userProfileRepository = userProfileRepository;
            _howRepository = howRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;

            return Ok(_howRepository.GetActiveHowsForDream(id, userId));
        }

        
        // GET api/<HowController>/5
        [HttpGet("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;

            var how = _howRepository.GetById(id);
            if (how == null)
            {
                return NotFound();
            }

            if (how.Dream.UserProfileId != userId)
            {
                return Unauthorized();
            }

            return Ok(how);
        }

        [HttpGet("GetRandom/{id}/{timeAvailable}")]
        public IActionResult GetRandom(int id, int timeAvailable)
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;

            return Ok(_howRepository.GetRandomHow(id, userId, timeAvailable));
        }

        

        // POST api/<HowController>
        [HttpPost]
        public IActionResult Post(How how)
        {
            _howRepository.Add(how);
            return CreatedAtAction("Get", new { id = how.Id }, how);
        }


        // DELETE api/<HowController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _howRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public void Put(How how)
        {
            _howRepository.Update(how);
        }
    }
}
