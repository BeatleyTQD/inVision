using inVision.Models;
using System.Collections.Generic;

namespace inVision.Repositories
{
    public interface IWhyRepository
    {
        List<Why> GetWhysForDream(int dreamId, int userProfileId);
        public void Add(Why why);
    }
}