namespace backend.Models.Status_Priority
{
    public class Priority
    {
        public int Id { get; set; }
        public string Level { get; set; }

        public Priority(int id, string level)
        {
            Id = id;
            Level = level;
        }
    }
}
