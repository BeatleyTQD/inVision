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
            return Ok(_dreamRepository.GetActiveDreams());
        }
    }
}
