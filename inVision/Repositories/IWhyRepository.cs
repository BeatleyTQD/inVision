using inVision.Models;
using System.Collections.Generic;

namespace inVision.Repositories
{
    public interface IWhyRepository
    {
        List<Why> GetWhysForDream(int dreamId, int userProfileId);
        Why GetById(int id);
        public void Add(Why why);
        public void Delete(int id);
        public void Update(Why why);

    }
}