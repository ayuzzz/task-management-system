using backend.Models.Status_Priority;
using backend.Repositories.Sql;
using Dapper;

namespace backend.Repositories
{
    public class StatusPriorityRepository: IStatusPriorityRepository
    {
        private ISqlConnectionFactory SqlConnectionFactory { get; set; }
        public StatusPriorityRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            SqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<IEnumerable<StatusDetails>> GetStatusesAsync()
        {
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                var query = "SELECT Id, Status FROM Status ORDER BY Id";
                var result = await connection.QueryAsync<StatusDetails>(query);

                return result;
            }
        }

        public async Task<IEnumerable<Priority>> GetPriorityLevelsAsync()
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                var query = "SELECT Id, Level FROM Priority ORDER BY Id";
                var result = await connection.QueryAsync<Priority>(query);

                return result;
            }
        }
    }
}
