using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Models
{
    public class How
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int TimeToComplete { get; set; }

        [Required]
        public int IsRepeatable { get; set; }
        [Required]
        public int IsDeleted { get; set; }

        [Required]
        public int DreamId { get; set; }

        public Dream Dream { get; set; }
    }
}
