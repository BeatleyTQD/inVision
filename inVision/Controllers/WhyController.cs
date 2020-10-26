using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using inVision.Models;
using inVision.Repositories;
using System.Security.Claims;

namespace inVision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WhyController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IWhyRepository _whyRepository;

        public WhyController(IUserProfileRepository userProfileRepository, IWhyRepository whyRepository)
        {
            _userProfileRepository = userProfileRepository;
            _whyRepository = whyRepository;
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

            return Ok(_whyRepository.GetWhysForDream(id, userId));
        }

        [HttpPost]
        public IActionResult Post(Why why)
        {
            _whyRepository.Add(why);
            return CreatedAtAction("Get", new { id = why.Id }, why);
        }
    }
}

