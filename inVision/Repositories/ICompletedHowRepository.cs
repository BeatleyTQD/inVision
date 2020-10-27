using inVision.Models;
using System.Collections.Generic;

namespace inVision.Repositories
{
    public interface ICompletedHowRepository
    {
        List<CompletedHow> GetCompletedHows(int dreamId);
    }
}