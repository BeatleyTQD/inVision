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

            return Ok(_howRepository.GetActiveHowsForDream(id, user.Id));
        }

        
        // GET api/<HowController>/5
        [HttpGet("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            UserProfile user = GetCurrentUserProfile();

            var how = _howRepository.GetById(id);
            if (how == null)
            {
                return NotFound();
            }

            if (how.Dream.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            return Ok(how);
        }

        [HttpGet("GetRandom/{id}/{timeAvailable}")]
        public IActionResult GetRandom(int id, int timeAvailable)
        {
            UserProfile user = GetCurrentUserProfile();

            var randomHow = _howRepository.GetRandomHow(id, user.Id, timeAvailable);
            if (randomHow == null)
            {
                return NotFound();
            }

            if (randomHow.Dream.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            return Ok(randomHow);
            
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
            UserProfile user = GetCurrentUserProfile();

            _howRepository.Delete(id, user.Id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(How how)
        {
            UserProfile user = GetCurrentUserProfile();
            _howRepository.Update(how, user.Id);
            return NoContent();
        }
    }
}
