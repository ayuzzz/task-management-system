using backend.Models.Status_Priority;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace backend.Controllers
{
    [ApiController]
    public class StatusPriorityController : ControllerBase
    {
        IStatusPriorityService StatusPriorityService { get; set; }
        public StatusPriorityController(IStatusPriorityService statusPriorityService)
        {
            StatusPriorityService = statusPriorityService;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "status-priority")]
        [HttpGet("status")]
        public async Task<ActionResult<StatusDetails>> GetStatusesAsync()
        {
            return Ok(await StatusPriorityService.GetStatusesAsync());
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "status-priority")]
        [HttpGet("priority")]
        public async Task<ActionResult<Priority>> GetPriorityLevelsAsync()
        {
            return Ok(await StatusPriorityService.GetPriorityLevelsAsync());
        }
    }
}
