using backend.Models.Users;

namespace backend.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<int> SaveUserDetailsAsync(User userDetails);
    }
}
