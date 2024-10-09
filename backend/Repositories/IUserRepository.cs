using backend.Models.Users;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<int> SaveUserDetailsAsync(User userDetails);
    }
}
