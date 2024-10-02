namespace backend.Models.Projects
{
    public record ProjectUserMapping
    {
        public int Id { get; init; }
        public int ProjectId { get; init; }
        public int UserId { get; init; }

        public ProjectUserMapping(int id, int projectId, int userId)
        {
            Id = id;
            ProjectId = projectId;
            UserId = userId;
        }
    }
}
