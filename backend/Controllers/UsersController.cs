using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using backend.Models.Users;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IUserService UserService { get; set; }
        public UsersController(IUserService userService)
        {
            UserService = userService;
        }

        [Authorize(Policy = "RequireValidToken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "users")]
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersAsync()
        {
            return Ok(await UserService.GetAllUsersAsync());
        }

        [Authorize(Policy = "RequireValidToken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        [ApiExplorerSettings(GroupName = "users")]
        [HttpPut("users/save")]
        public async Task<ActionResult<int>> SaveUserDetailsAsync(User userDetails)
        {
            return Ok(await UserService.SaveUserDetailsAsync(userDetails));
        }
    }
}
