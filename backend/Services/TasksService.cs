
using backend.Models.Tasks;
using backend.Repositories;

namespace backend.Services
{
    public class TasksService : ITasksService
    {
        public ITasksRepository TasksRepository { get; set; }
        public TasksService(ITasksRepository tasksRepository)
        {
            TasksRepository = tasksRepository ?? throw new ArgumentNullException(nameof(tasksRepository));
        }
        public async Task<IEnumerable<TmsTask>> GetAllTasksAsync()
        {
            return await TasksRepository.GetAllTasksAsync();
        }

        public async Task<IEnumerable<MiniatureTask>> GetMiniatureTasksAsync()
        {
            return await TasksRepository.GetMiniatureTasksAsync();
        }

        public async Task<TmsTask?> GetTaskDetailsAsync(int taskId)
        {
            return await TasksRepository.GetTaskDetailsAsync(taskId);
        }

        public async Task<int> UpsertTaskAsync(TmsTask task)
        {
            return await TasksRepository.UpsertTaskAsync(task);
        }

        public async Task<int> DeleteTaskAsync(int taskId)
        {
            return await TasksRepository.DeleteTaskAsync(taskId);
        }
    }
}
