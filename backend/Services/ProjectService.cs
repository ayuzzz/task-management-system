using backend.Models.Projects;
using backend.Repositories;

namespace backend.Services
{
    public class ProjectService : IProjectService
    {
        private IProjectRepository ProjectRepository;
        public ProjectService(IProjectRepository projectRepository)
        {
            ProjectRepository = projectRepository;
        }
        public async Task<IEnumerable<Project>> GetAllProjectsAsync(int userId)
        {
            return await ProjectRepository.GetAllProjectsAsync(userId);
        }

        public async Task<Project?> GetProjectDetailsAsync(int projectId)
        {
            return await ProjectRepository.GetProjectDetailsAsync(projectId);
        }

        public async Task<IEnumerable<ProjectUserMapping>> GetProjectUserMappingsAsync()
        {
            return await ProjectRepository.GetProjectUserMappingsAsync();
        }

        public async Task<int> UpsertProjectAsync(ProjectDetails project)
        {
            return await ProjectRepository.UpsertProjectAsync(project);
        }
    }
}
