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

        public List<How> GetActiveHowsForDream(int dreamId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT DISTINCT h.Id, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId,
				                                        d.Name, d.IsDeactivated, d.UserProfileId
                                                   FROM How h
                                                   JOIN Dream d ON h.DreamId = d.Id
                                                   LEFT JOIN CompletedHow ch ON h.Id = ch.HowId 
                                                   WHERE (ch.Id IS NULL OR h.IsRepeatable = 1)
                                                   AND (h.DreamId = @dreamId AND d.UserProfileId = @userProfileId AND IsDeleted = 0)";
                    cmd.Parameters.AddWithValue("@dreamId", dreamId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    var hows = new List<How>();

                    while (reader.Read())
                    {
                        hows.Add(new How()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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
                                        WHERE h.Id = @id AND IsDeleted = 0";
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

        public How GetRandomHow(int dreamId, int userProfileId, int timeAvailable)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    var timeLow = 0;
                    var timeHigh = 0;
                    if (timeAvailable <= 30)
                    {
                        timeLow = 0;
                        timeHigh = timeAvailable;

                    } else if (timeAvailable <= 60)
                    {
                        timeLow = 30;
                        timeHigh = timeAvailable;
                    } else
                    {
                        timeLow = 60;
                        timeHigh = timeAvailable;
                    }

                    cmd.CommandText = @"SELECT TOP 1 Id, Description, TimeToComplete, IsRepeatable, DreamId, Name, IsDeactivated, UserProfileId
                                                FROM 
		                                        (
				                                        SELECT DISTINCT h.Id, h.Description, h.TimeToComplete, h.IsRepeatable, h.DreamId,
								                                        d.Name, d.IsDeactivated, d.UserProfileId
				                                          FROM How h
			                                              JOIN Dream d ON h.DreamId = d.Id
	                                                 LEFT JOIN CompletedHow ch ON h.Id = ch.HowId 
				                                         WHERE (ch.Id IS NULL OR h.IsRepeatable = 1) 
				                                           AND (h.DreamId = @dreamId AND d.UserProfileId = @userProfileId AND h.IsDeleted = 0)
				                                           )
                                        AS HowOptions
                                        WHERE TimeToComplete >= @timeLow AND TimeToComplete <= @timeHigh
                                        ORDER BY NEWID()";

                    cmd.Parameters.AddWithValue("@dreamId", dreamId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    cmd.Parameters.AddWithValue("@timeLow", timeLow);
                    cmd.Parameters.AddWithValue("@timeHigh", timeHigh);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        How how = new How()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
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
                    cmd.CommandText = @"INSERT INTO How (Description, TimeToComplete, IsRepeatable, IsDeleted, DreamId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Description, @TimeToComplete, @IsRepeatable, 0, @DreamId)";
                    cmd.Parameters.AddWithValue("@Description", how.Description);
                    cmd.Parameters.AddWithValue("@TimeToComplete", how.TimeToComplete);
                    cmd.Parameters.AddWithValue("@IsRepeatable", how.IsRepeatable);
                    cmd.Parameters.AddWithValue("@DreamId", how.DreamId);

                    how.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Delete(int HowId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE How
                                           SET How.IsDeleted = 1
                                          FROM How JOIN Dream ON How.DreamId = Dream.Id
                                          JOIN UserProfile ON Dream.UserProfileId = UserProfile.Id
                                         WHERE How.Id = @HowId AND UserProfile.Id = @UserProfileId";
                    cmd.Parameters.AddWithValue("@HowId", HowId);
                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileId);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(How how, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE How
                                           SET How.Description = @Description,
                                               How.TimeToComplete = @TimeToComplete,
                                               How.IsRepeatable = @IsRepeatable
                                          FROM How JOIN Dream ON How.DreamId = Dream.Id
                                          JOIN UserProfile ON Dream.UserProfileId = UserProfile.Id
                                         WHERE How.Id = @HowId AND UserProfile.Id = @UserProfileId";
                    cmd.Parameters.AddWithValue("@Description", how.Description);
                    cmd.Parameters.AddWithValue("@TimeToComplete", how.TimeToComplete);
                    cmd.Parameters.AddWithValue("@IsRepeatable", how.IsRepeatable);
                    cmd.Parameters.AddWithValue("@HowId", how.Id);
                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
