﻿namespace backend.Models.Projects
{
    public record Project
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public string DueDate { get; init; }
        public int UserId { get; init; }
        public int StatusId { get; init; }

        public Project(int id, string name, string description, string dueDate, int userId, int statusId)
        {
            Id = id;
            Name = name;
            Description = description;
            DueDate = dueDate;
            UserId = userId;
            StatusId = statusId;
        }
    }
}
