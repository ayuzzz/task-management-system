using backend.Models.Projects;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace backend.Controllers
{
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private IProjectService ProjectService;
        public ProjectsController(IProjectService projectService)
        {
            ProjectService = projectService;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "projects")]
        [HttpGet("projects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjectsAsync()
        {
            return Ok(await ProjectService.GetAllProjectsAsync());
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "projects")]
        [HttpGet("projects/{projectId}")]
        public async Task<ActionResult<Project>> GetProjectDetailsAsync(int projectId)
        {
            return Ok(await ProjectService.GetProjectDetailsAsync(projectId));
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "projects")]
        [HttpGet("projects/users")]
        public async Task<ActionResult<IEnumerable<ProjectUserMapping>>> GetProjectUserMappingsAsync()
        {
            return Ok(await ProjectService.GetProjectUserMappingsAsync());
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "projects")]
        [HttpPut("projects")]
        public async Task<ActionResult<int>> UpsertProjectDetailsAsync(Project project)
        {
            //@TODO: Handling of ProjectUserMapping needs to be implemented
            return Ok(await ProjectService.UpsertProjectAsync(project));
        }
    }
}
