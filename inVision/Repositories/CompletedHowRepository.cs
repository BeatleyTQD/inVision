using inVision.Models;
using inVision.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Repositories
{
    public class CompletedHowRepository : BaseRepository, ICompletedHowRepository
    {
        public CompletedHowRepository(IConfiguration configuration) : base(configuration) { }

        public List<CompletedHow> GetCompletedHows(int dreamId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ch.Id AS CompletedId, ch.DateCompleted, h.Id AS HowId, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId 
                                          FROM CompletedHow ch 
                                          JOIN How h ON ch.HowId = h.Id 
                                         WHERE h.DreamId = @dreamId";
                    cmd.Parameters.AddWithValue("@dreamId", dreamId);

                    var reader = cmd.ExecuteReader();
                    var completedHows = new List<CompletedHow>();

                    while (reader.Read())
                    {
                        completedHows.Add(new CompletedHow()
                        {
                            Id = DbUtils.GetInt(reader, "CompletedId"),
                            DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                            HowId = DbUtils.GetInt(reader, "HowId"),
                            How = new How()
                            {
                                Id = DbUtils.GetInt(reader, "HowId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                TimeToComplete = DbUtils.GetInt(reader, "TimeToComplete"),
                                IsRepeatable = DbUtils.GetInt(reader, "IsRepeatable"),
                                DreamId = DbUtils.GetInt(reader, "DreamId")
                            }
                        });
                    }
                    reader.Close();
                    return completedHows;
                }
            }
        }
    }
}
