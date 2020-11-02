using inVision.Models;
using System.Collections.Generic;

namespace inVision.Repositories
{
    public interface IHowRepository
    {
        List<How> GetActiveHowsForDream(int dreamId, int userProfileId);
        How GetById(int howId);
        How GetRandomHow(int dreamId, int userProfileId, int timeAvailable);
        public void Add(How how);
        public void Delete(int id, int userProfileId);
        public void Update(How how, int userProfileId);
    }
}