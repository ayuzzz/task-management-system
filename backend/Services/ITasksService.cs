﻿using backend.Models.Tasks;

namespace backend.Services
{
    public interface ITasksService
    {
        Task<IEnumerable<TmsTask>> GetAllTasksAsync(int userId);
        Task<IEnumerable<MiniatureTask>> GetMiniatureTasksAsync(int userId);
        Task<TmsTask?> GetTaskDetailsAsync(int taskId);
        Task<int> UpsertTaskAsync(TmsTask task);
        Task<int> DeleteTaskAsync(int taskId);
    }
}
