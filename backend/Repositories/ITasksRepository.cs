using backend.Models.Tasks;

namespace backend.Repositories
{
    public interface ITasksRepository
    {
        Task<IEnumerable<TmsTask>> GetAllTasksAsync();
        Task<IEnumerable<MiniatureTask>> GetMiniatureTasksAsync();
        Task<TmsTask?> GetTaskDetailsAsync(int taskId);
        Task<int> UpsertTaskAsync(TmsTask task);
        Task<int> DeleteTaskAsync(int taskId);
    }
}
