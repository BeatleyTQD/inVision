using inVision.Models;
using System.Collections.Generic;

namespace inVision.Repositories
{
    public interface IDreamRepository
    {
        List<Dream> GetActiveDreams();
    }
}