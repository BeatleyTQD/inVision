using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using inVision.Models;
using inVision.Repositories;
using System.Security.Claims;

namespace inVision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompletedHowController : Controller
    {
        private readonly ICompletedHowRepository _completedHowRepository;

        public CompletedHowController(ICompletedHowRepository completedHowRepository)
        {
            _completedHowRepository = completedHowRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_completedHowRepository.GetCompletedHows(id));
        }
    }
}
