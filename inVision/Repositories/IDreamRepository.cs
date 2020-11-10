using inVision.Models;
using System.Collections.Generic;

namespace inVision.Repositories
{
    public interface IDreamRepository
    {
        List<Dream> GetActiveDreams(int userProfileId);
        Dream GetById(int id);
        Dream GetOthersDream(int id);
        public void Add(Dream dream);
        public void DeactivateDream(int dreamId, int userProfileId);
    }
}