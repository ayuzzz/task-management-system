using backend.Models.Status_Priority;

namespace backend.Repositories
{
    public interface IStatusPriorityRepository
    {
        Task<IEnumerable<StatusDetails>> GetStatusesAsync();
        Task<IEnumerable<Priority>> GetPriorityLevelsAsync();
    }
}
