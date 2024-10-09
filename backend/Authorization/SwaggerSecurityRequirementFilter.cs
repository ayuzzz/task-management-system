using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace backend.Authorization
{
    public class SwaggerSecurityRequirementFilter: IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            // Check if [AllowAnonymous] is used on the operation
            var hasAllowAnonymous = context.MethodInfo
                .GetCustomAttributes(true)
                .Any(a => a.GetType().Name == nameof(AllowAnonymousAttribute));

            // Check if [Authorize] is used on the operation
            var hasAuthorize = context.MethodInfo
                .GetCustomAttributes(true)
                .Any(a => a.GetType().Name == nameof(AuthorizeAttribute));

            if (hasAuthorize && !hasAllowAnonymous)
            {
                if (operation.Parameters == null)
                {
                    operation.Parameters = new List<OpenApiParameter>();
                }

                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Description = $"Example: 'Bearer &lt;token&gt;'.",
                    Required = true,
                    Schema = new OpenApiSchema
                    {
                        Type = "string",
                        Default = new OpenApiString("Bearer {access token}"),
                    },
                    
                });

                operation.Security = new List<OpenApiSecurityRequirement>
            {
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                }
            };

                operation.Responses[$"{StatusCodes.Status401Unauthorized}"] = new OpenApiResponse { Description = "Unauthorized: Request not authorized. A valid and correct token must be used." };
                operation.Responses[$"{StatusCodes.Status403Forbidden}"] = new OpenApiResponse { Description = "Forbidden: Token does not allow access." };
            }
        }
    }
}
