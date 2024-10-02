namespace backend.Models.Status_Priority
{
    public class StatusDetails
    {
        public int Id { get; set; }
        public string Status { get; set; }

        public StatusDetails(int id, string status)
        {
            Id = id;
            Status = status;
        }
    }
}
