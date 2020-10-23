using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Models
{
    public class CompletedHow
    {
        public int Id { get; set; }

        [Required]
        public DateTime DateCompleted { get; set; }

        [Required]
        public int HowId { get; set; }

        public How How { get; set; }
    }
}
