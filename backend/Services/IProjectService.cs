using backend.Models.Projects;

namespace backend.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync(int userId);
        Task<Project?> GetProjectDetailsAsync(int projectId);
        Task<IEnumerable<ProjectUserMapping>> GetProjectUserMappingsAsync();
        Task<int> UpsertProjectAsync(ProjectDetails project);
    }
}
