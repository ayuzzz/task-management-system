using backend.Models.Projects;

namespace backend.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<Project?> GetProjectDetailsAsync(int projectId);
        Task<IEnumerable<ProjectUserMapping>> GetProjectUserMappingsAsync();
        Task<int> UpsertProjectAsync(Project project);
    }
}
