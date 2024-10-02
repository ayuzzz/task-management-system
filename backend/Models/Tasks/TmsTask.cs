namespace backend.Models.Tasks
{
    public record TmsTask
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public string DueDate { get; init; }
        public int PriorityId { get; init; }
        public int StatusId { get; init; }
        public int ProjectId { get; init; }
        public int UserId { get; init; }

        public TmsTask(int id, string title, string description, string dueDate, int priorityId, int statusId, int projectId, int userId)
        {
            Id = id;
            Title = title;
            Description = description;
            DueDate = dueDate;
            PriorityId = priorityId;
            StatusId = statusId;
            ProjectId = projectId;
            UserId = userId;
        }
    }
}
