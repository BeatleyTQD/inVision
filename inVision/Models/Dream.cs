using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Models
{
    public class Dream
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int IsDeactivated { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public UserProfile UserProfile { get; set; }

        [Required]
        public List<How> Hows { get; set; }

        public List<CompletedHow> CompletedHows { get; set; }

        public List<Why> Whys { get; set; }
    }
}
