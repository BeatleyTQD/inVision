﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using inVision.Models;
using inVision.Repositories;
using System.Security.Claims;

namespace inVision.Controllers
{
    [Authorize]
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

            return Ok(_whyRepository.GetWhysForDream(id, user.Id));
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            UserProfile user = GetCurrentUserProfile();

            var why = _whyRepository.GetById(id, user.Id);

            if (why.Dream.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            if (why == null)
            {
                return NotFound();
            }
            return Ok(why);
        }

        [HttpGet]
        [Route("GetRandom/{id}")]
        public IActionResult GetRandom(int id)
        {
            UserProfile user = GetCurrentUserProfile();

            var why = _whyRepository.GetRandomWhy(id, user.Id);


            if (why == null)
            {
                return NotFound();
            }

            if (why.Dream.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            return Ok(why);
        }

        [HttpPost]
        public IActionResult Post(Why why)
        {
            _whyRepository.Add(why);
            return CreatedAtAction("Get", new { id = why.Id }, why);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            UserProfile user = GetCurrentUserProfile();

            _whyRepository.Delete(id, user.Id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(Why why)
        {
            UserProfile user = GetCurrentUserProfile();

            _whyRepository.Update(why, user.Id);
            return NoContent();
        }
    }
}

