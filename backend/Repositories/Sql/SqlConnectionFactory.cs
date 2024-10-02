using backend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace backend.Repositories.Sql
{
    public class SqlConnectionFactory : ISqlConnectionFactory
    {
        private ConnectionStringOptions ConnectionStringOptions { get; set; }

        public SqlConnectionFactory(IOptions<ConnectionStringOptions> connectionStringOptions)
        {
            ConnectionStringOptions = connectionStringOptions?.Value ?? throw new NullReferenceException("ConnectionStringOptions is empty.");
        }
        public SqlConnection CreateSqlConnection()
        {
            return new SqlConnection(ConnectionStringOptions.SqlServerConnectionString);
        }
    }
}
