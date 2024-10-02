
using backend.Models.Tasks;
using backend.Repositories.Sql;
using Dapper;

namespace backend.Repositories
{
    public class TasksRepository : ITasksRepository
    {
        private ISqlConnectionFactory SqlConnectionFactory { get; set; }
        public TasksRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            SqlConnectionFactory = sqlConnectionFactory;
        }
        public async Task<IEnumerable<TmsTask>> GetAllTasksAsync()
        {
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = "SELECT * FROM Task";
                return await connection.QueryAsync<TmsTask>(query);
            }
        }

        public async Task<IEnumerable<MiniatureTask>> GetMiniatureTasksAsync()
        {
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = @"SELECT t.Id, t.Title, t.DueDate, p.Level as 'Priority', s.Status, pr.Name as Project, u.Id as UserId FROM Task t INNER JOIN Priority p ON p.Id = t.PriorityId INNER JOIN Status s ON s.Id = t.StatusId INNER JOIN Project pr on t.ProjectId = pr.Id INNER JOIN Users u on u.Id = t.UserId;";
                return await connection.QueryAsync<MiniatureTask>(query);
            }
        }

        public async Task<TmsTask?> GetTaskDetailsAsync(int taskId)
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = @"SELECT * FROM Task WHERE Id = @TaskId";
                return await connection.QuerySingleOrDefaultAsync<TmsTask>(query, new { TaskId = taskId });
            }
        }

        public async Task<int> UpsertTaskAsync(TmsTask task)
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = @"MERGE INTO Task AS target
USING (SELECT @Id as Id, @Title as Title, @Description as Description, @DueDate as DueDate, @PriorityId as PriorityId, @StatusId as StatusId, @ProjectId as ProjectId, @UserId as UserId) AS source
ON target.Id = source.Id
WHEN MATCHED THEN
    UPDATE SET target.Title = source.Title, target.Description = source.Description, target.DueDate = source.DueDate, target.PriorityId = source.PriorityId, target.StatusId = source.StatusId, target.ProjectId = source.ProjectId 
WHEN NOT MATCHED THEN
    INSERT (Id, Title, Description, DueDate, PriorityId, StatusId, ProjectId, UserId) VALUES (@Id, @Title, @Description, @DueDate, @PriorityId, @StatusId, @ProjectId, @UserId);";
                return await connection.ExecuteAsync(query, param: task);
            }
        }

        public async Task<int> DeleteTaskAsync(int taskId)
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = @"DELETE FROM Task WHERE Id = @TaskId;";
                return await connection.ExecuteAsync(query, new { TaskId = taskId });
            }
        }
    }
}
