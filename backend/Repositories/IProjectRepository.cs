using backend.Models.Projects;

namespace backend.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<Project?> GetProjectDetailsAsync(int projectId);
        Task<IEnumerable<ProjectUserMapping>> GetProjectUserMappingsAsync();
        Task<int> UpsertProjectAsync(Project project);
    }
}
