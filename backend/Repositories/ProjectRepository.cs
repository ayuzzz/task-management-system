using backend.Models.Projects;
using backend.Models.Tasks;
using backend.Repositories.Sql;
using Dapper;

namespace backend.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private ISqlConnectionFactory SqlConnectionFactory;
        public ProjectRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            SqlConnectionFactory = sqlConnectionFactory;
        }
        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = "SELECT * FROM Project";
                return await connection.QueryAsync<Project>(query);
            }
        }

        public async Task<Project?> GetProjectDetailsAsync(int projectId)
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = "SELECT * FROM Project WHERE Id = @ProjectId";
                return await connection.QueryFirstOrDefaultAsync<Project?>(query, new { ProjectId = projectId });
            }
        }

        public async Task<IEnumerable<ProjectUserMapping>> GetProjectUserMappingsAsync()
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = "SELECT * FROM ProjectUserMapping";
                return await connection.QueryAsync<ProjectUserMapping>(query);
            }
        }

        public async Task<int> UpsertProjectAsync(Project project)
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = @"MERGE INTO Project AS target
USING (SELECT @Id as Id, @Name as Name, @Description as Description, @DueDate as DueDate, @UserId as UserId, @StatusId as StatusId) AS source
ON target.Id = source.Id
WHEN MATCHED THEN
    UPDATE SET target.Name = source.Name, target.Description = source.Description, target.DueDate = source.DueDate, target.StatusId = source.StatusId
WHEN NOT MATCHED THEN
    INSERT (Id, Name, Description, DueDate, UserId, StatusId) VALUES (@Id, @Name, @Description, @DueDate, @UserId, @StatusId);";
                return await connection.ExecuteAsync(query, param: project);
            }
        }
    }
}
