using backend.Models.Projects;
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
        public async Task<IEnumerable<Project>> GetAllProjectsAsync(int userId)
        {
            using(var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                string query = "SELECT * FROM Project WHERE UserId = @UserId";
                return await connection.QueryAsync<Project>(query, new { UserId = userId });
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

        public async Task<int> UpsertProjectAsync(ProjectDetails project)
        {
            using (var connection = SqlConnectionFactory.CreateSqlConnection())
            {
                await connection.OpenAsync();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    { 
                        // First, upsert the project details
                        string projectQuery = @"MERGE INTO Project AS target
        USING (SELECT @Id as Id, @Name as Name, @Description as Description, @DueDate as DueDate, @UserId as UserId, @StatusId as StatusId) AS source
        ON target.Id = source.Id
        WHEN MATCHED THEN
            UPDATE SET target.Name = source.Name, target.Description = source.Description, target.DueDate = source.DueDate, target.StatusId = source.StatusId
        WHEN NOT MATCHED THEN
            INSERT (Id, Name, Description, DueDate, UserId, StatusId) VALUES (@Id, @Name, @Description, @DueDate, @UserId, @StatusId);";

                        await connection.ExecuteAsync(projectQuery, param: project, transaction: transaction);

                        // Delete existing mappings that are no longer in the current list of TeamMembers
                        string deleteQuery = @"
        DELETE FROM ProjectUserMapping 
        WHERE ProjectId = @ProjectId 
        AND UserId NOT IN @CurrentTeamMembers;";

                        await connection.ExecuteAsync(deleteQuery, new
                        {
                            ProjectId = project.Id,
                            CurrentTeamMembers = project.TeamMembers.ToArray()
                        }, transaction: transaction);

                        // Now upsert the team members into ProjectUserMapping
                        foreach (var memberId in project.TeamMembers)
                        {
                            string teamMemberQuery = @"
        MERGE INTO ProjectUserMapping AS target
        USING (SELECT @ProjectId AS ProjectId, @UserId AS UserId) AS source
        ON target.ProjectId = source.ProjectId AND target.UserId = source.UserId
        WHEN NOT MATCHED THEN
            INSERT (ProjectId, UserId) 
            VALUES (source.ProjectId, source.UserId);";

                            var parameters = new { ProjectId = project.Id, UserId = memberId };

                            await connection.ExecuteAsync(teamMemberQuery, param: parameters, transaction: transaction);
                        }

                        // Commit transaction
                        transaction.Commit();
                    }
                    catch
                    {
                        // Rollback if any exception occurs
                        transaction.Rollback();
                        throw;
                    }
                }
            }

            return 1; // Return a status code or result
        }


    }
}
