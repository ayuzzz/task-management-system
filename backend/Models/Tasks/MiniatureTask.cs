namespace backend.Models.Tasks
{
    public record MiniatureTask
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public string DueDate { get; init; }
        public string Priority { get; init; }
        public string Status { get; init; }
        public string Project { get; init; }
        public int UserId { get; init; }

        public MiniatureTask(int id, string title, string dueDate, string priority, string status, string project, int userId)
        {
            Id = id;
            Title = title;
            DueDate = dueDate;
            Priority = priority;
            Status = status;
            Project = project;
            UserId = userId;
        }
    }
}
