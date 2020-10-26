using inVision.Models;
using inVision.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Repositories
{
    public class DreamRepository : BaseRepository, IDreamRepository
    {
        public DreamRepository(IConfiguration configuration) : base(configuration) { }

        public List<Dream> GetActiveDreams()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT d.Id , d.Name AS DreamName, d.IsDeactivated, d.UserProfileId,
                                               up.UserName, up.Email
                                          FROM Dream d
                                          JOIN UserProfile up ON d.UserProfileId = up.Id
                                         WHERE d.IsDeactivated = 0";
                    var reader = cmd.ExecuteReader();

                    var dreams = new List<Dream>();

                    while (reader.Read())
                    {
                        dreams.Add(new Dream()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "DreamName"),
                            IsDeactivated = DbUtils.GetInt(reader, "IsDeactivated"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "Email")
                            }
                        });
                    }

                    reader.Close();

                    return dreams;
                }
            }
        }
    }
}
