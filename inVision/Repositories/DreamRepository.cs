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

        public List<Dream> GetActiveDreams(int userProfileId)
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
                                         WHERE d.UserProfileId = @userProfileId AND d.IsDeactivated = 0";
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
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

        public List<Dream> GetInactiveDreams(int userProfileId)
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
                                         WHERE d.UserProfileId = @userProfileId AND d.IsDeactivated = 1";
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
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

        public Dream GetById(int id)
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
                                         WHERE d.Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Dream dream = new Dream()
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
                        };
                        reader.Close();
                        return dream;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public Dream GetOthersDream(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT TOP 1 Id, Name, IsDeactivated, UserProfileId 
                                          FROM Dream 
                                         WHERE UserProfileId != @Id AND IsDeactivated = 0
                                         ORDER BY NEWID();";
                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Dream dream = new Dream()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            IsDeactivated = DbUtils.GetInt(reader, "IsDeactivated"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        };
                        reader.Close();
                        return dream;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
        
        public void Add(Dream dream)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Dream (Name, IsDeactivated, UserProfileId)
	                                    OUTPUT INSERTED.ID
   	                                    VALUES (@Name, 0, @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Name", dream.Name);
                    cmd.Parameters.AddWithValue("@UserProfileId", dream.UserProfileId);

                    dream.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //soft delete
        public void DeactivateDream(int dreamId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Dream 
                                           SET IsDeactivated = 1
                                         WHERE Id = @Id AND UserProfileId = @userProfileId";
                    cmd.Parameters.AddWithValue("@Id", dreamId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //soft delete
        public void ReactivateDream(int dreamId, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Dream 
                                           SET IsDeactivated = 0
                                         WHERE Id = @Id AND UserProfileId = @userProfileId";
                    cmd.Parameters.AddWithValue("@Id", dreamId);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
