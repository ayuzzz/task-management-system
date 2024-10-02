using backend.Models.Status_Priority;
using backend.Repositories;

namespace backend.Services
{
    public class StatusPriorityService:IStatusPriorityService
    {
        private IStatusPriorityRepository StatusPriorityRepository { get; set; }
        public StatusPriorityService(IStatusPriorityRepository statusPriorityRepository)
        {
            StatusPriorityRepository = statusPriorityRepository;
        }

        public async Task<IEnumerable<StatusDetails>> GetStatusesAsync()
        {
            return await StatusPriorityRepository.GetStatusesAsync();
        }

        public async Task<IEnumerable<Priority>> GetPriorityLevelsAsync()
        {
            return await StatusPriorityRepository.GetPriorityLevelsAsync();
        }
    }
}
