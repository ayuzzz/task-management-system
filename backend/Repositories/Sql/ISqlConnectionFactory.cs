using Microsoft.Data.SqlClient;

namespace backend.Repositories.Sql
{
    public interface ISqlConnectionFactory
    {
        SqlConnection CreateSqlConnection();
    }
}
