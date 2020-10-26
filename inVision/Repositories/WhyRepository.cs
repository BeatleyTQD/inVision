using inVision.Models;
using inVision.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Repositories
{
    public class WhyRepository : BaseRepository, IWhyRepository
    {
        public WhyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Why> GetWhysForDream(int dreamId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT w.Id AS WhyId, w.Description, w.DreamId, d.Name, d.IsDeactivated, d.UserProfileId
                                         FROM Why w
                                         JOIN Dream d ON w.DreamId = d.Id
                                        WHERE w.DreamId = @dreamId AND d.UserProfileId =  @userProfileId";
                    cmd.Parameters.AddWithValue("@dreamId", dreamId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var whys = new List<Why>();

                    while (reader.Read())
                    {
                        whys.Add(new Why()
                        {
                            Id = DbUtils.GetInt(reader, "WhyId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            DreamId = DbUtils.GetInt(reader, "DreamId"),
                            Dream = new Dream()
                            {
                                Id = DbUtils.GetInt(reader, "DreamId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                IsDeactivated = DbUtils.GetInt(reader, "IsDeactivated"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            }
                        });
                    }

                    reader.Close();
                    return whys;
                }
            }
        }

        public void Add(Why why)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Why (Description, DreamId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Description, @DreamId)";
                    cmd.Parameters.AddWithValue("@Description", why.Description);
                    cmd.Parameters.AddWithValue("@DreamId", why.DreamId);

                    why.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
