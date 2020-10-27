using inVision.Models;
using inVision.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inVision.Repositories
{
    public class HowRepository : BaseRepository, IHowRepository
    {
        public HowRepository(IConfiguration configuration) : base(configuration) { }

        public List<How> GetHowsForDream(int dreamId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT h.Id AS HowId, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId,
	                                           d.Name, d.IsDeactivated, d.UserProfileId
                                          FROM How h 
                                          JOIN Dream d ON h.DreamId = d.Id
                                          WHERE d.Id = @dreamId AND d.UserProfileId = @userProfileId";
                    cmd.Parameters.AddWithValue("@dreamId", dreamId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var hows = new List<How>();

                    while (reader.Read())
                    {
                        hows.Add(new How()
                        {
                            Id = DbUtils.GetInt(reader, "HowId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            TimeToComplete = DbUtils.GetInt(reader, "TimeToComplete"),
                            IsRepeatable = DbUtils.GetInt(reader, "IsRepeatable"),
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
                    return hows;
                }
            }

        }
        public How GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT h.Id AS HowId, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId,
	                                           d.Name, d.IsDeactivated, d.UserProfileId
                                          FROM How h 
                                          JOIN Dream d ON h.DreamId = d.Id
                                        WHERE h.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        How how = new How()
                        {
                            Id = DbUtils.GetInt(reader, "HowId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            TimeToComplete = DbUtils.GetInt(reader, "TimeToComplete"),
                            IsRepeatable = DbUtils.GetInt(reader, "IsRepeatable"),
                            DreamId = DbUtils.GetInt(reader, "DreamId"),
                            Dream = new Dream()
                            {
                                Id = DbUtils.GetInt(reader, "DreamId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                IsDeactivated = DbUtils.GetInt(reader, "IsDeactivated"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            }
                        };
                        reader.Close();
                        return how;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void Add(How how)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO How (Description, TimeToComplete, IsRepeatable, DreamId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Description, @TimeToComplete, @IsRepeatable, @DreamId)";
                    cmd.Parameters.AddWithValue("@Description", how.Description);
                    cmd.Parameters.AddWithValue("@TimeToComplete", how.TimeToComplete);
                    cmd.Parameters.AddWithValue("@IsRepeatable", how.IsRepeatable);
                    cmd.Parameters.AddWithValue("@DreamId", how.DreamId);

                    how.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM How WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(How how)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE How 
                                           SET Description = @Description,
	                                           TimeToComplete = @TimeToComplete,
	                                           IsRepeatable = @IsRepeatable
                                         WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Description", how.Description);
                    cmd.Parameters.AddWithValue("@TimeToComplete", how.TimeToComplete);
                    cmd.Parameters.AddWithValue("@IsRepeatable", how.IsRepeatable);
                    cmd.Parameters.AddWithValue("@Id", how.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
