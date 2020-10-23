using inVision.Models;
using inVision.Utils;
using Microsoft.Extensions.Configuration;


namespace inVision.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserName, Email, FirebaseUserId 
                                          FROM UserProfile 
                                         WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, UserName, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @UserName, @Email)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}