using backend.Models.Tasks;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace backend.Controllers
{
    [ApiController]    
    public class TasksController : ControllerBase
    {
        private ITasksService TasksService { get; set; }
        public TasksController(ITasksService tasksService)
        {
            TasksService = tasksService ?? throw new ArgumentNullException(nameof(tasksService));
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "tasks")]
        [HttpGet("tasks")]
        public async Task<ActionResult<IEnumerable<TmsTask>>> GetAllTasksAsync()
        {
            return Ok(await TasksService.GetAllTasksAsync());
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "tasks")]
        [HttpGet("miniature-tasks")]
        public async Task<ActionResult<IEnumerable<MiniatureTask>>> GetMiniatureTasksAsync()
        {
            return Ok(await TasksService.GetMiniatureTasksAsync());
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "tasks")]
        [HttpGet("tasks/{taskId}")]
        public async Task<ActionResult<TmsTask?>> GetTaskDetailsAsync(int taskId)
        {
            return Ok(await TasksService.GetTaskDetailsAsync(taskId));
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "tasks")]
        [HttpDelete("tasks/{taskId}")]
        public async Task<ActionResult<int>> DeleteTaskAsync(int taskId)
        {
            return Ok(await TasksService.DeleteTaskAsync(taskId));
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "tasks")]
        [HttpPut("tasks")]
        public async Task<ActionResult<int>> UpsertTaskAsync(TmsTask task)
        {
            return Ok(await TasksService.UpsertTaskAsync(task));
        }
    }
}
