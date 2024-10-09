namespace backend.Models.Users
{
    public record User
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string Email { get; init; }

        public User(int id, string name, string email)
        {
            Id = id;
            Name = name;
            Email = email;
        }
    }
}
