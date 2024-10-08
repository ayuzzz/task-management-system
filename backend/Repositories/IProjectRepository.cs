using backend.Models.Projects;

namespace backend.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync(int userId);
        Task<Project?> GetProjectDetailsAsync(int projectId);
        Task<IEnumerable<ProjectUserMapping>> GetProjectUserMappingsAsync();
        Task<int> UpsertProjectAsync(ProjectDetails project);
    }
}
