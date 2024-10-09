using backend.Models.Users;
using backend.Repositories.Sql;
using Dapper;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        public ISqlConnectionFactory SqlConnectionFactory { get; set; }
        public UserRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            SqlConnectionFactory = sqlConnectionFactory;   
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {   
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                return await connection.QueryAsync<User>("SELECT * FROM Users;");
            }
        }

        public async Task<int> SaveUserDetailsAsync(User userDetails)
        {
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = @"
                MERGE INTO Users AS target
                USING (VALUES (@Name, @Email)) AS source (Name, Email)
                ON target.Email = source.Email
                WHEN MATCHED THEN
                    UPDATE SET Name = source.Name
                WHEN NOT MATCHED THEN
                    INSERT (Name, Email) 
                    VALUES (source.Name, source.Email);";

                return await connection.ExecuteAsync(query, new { Name = userDetails.Name, Email = userDetails.Email });
            }
        }
    }
}
