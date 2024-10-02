using backend.Models.Status_Priority;

namespace backend.Services
{
    public interface IStatusPriorityService
    {
        Task<IEnumerable<StatusDetails>> GetStatusesAsync();
        Task<IEnumerable<Priority>> GetPriorityLevelsAsync();
    }
}
