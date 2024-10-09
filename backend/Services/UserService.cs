using backend.Models.Users;
using backend.Repositories;

namespace backend.Services
{
    public class UserService : IUserService
    {
        public IUserRepository UserRepository { get; set; }
        public UserService(IUserRepository userRepository)
        {
            UserRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
           return await UserRepository.GetAllUsersAsync();
        }

        public async Task<int> SaveUserDetailsAsync(User userDetails)
        {
            return await UserRepository.SaveUserDetailsAsync(userDetails);
        }
    }
}
