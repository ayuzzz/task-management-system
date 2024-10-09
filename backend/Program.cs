using backend.Models;
using backend.Repositories;
using backend.Repositories.Sql;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using backend.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    // Add the Bearer token security definition
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter the token directly, without 'Bearer' keyword."
    });

    // Apply Bearer token security for each API that doesn't use [AllowAnonymous]
    option.OperationFilter<SwaggerSecurityRequirementFilter>();

    // Define a Swagger document for each group
    option.SwaggerDoc("tasks", new OpenApiInfo
    {
        Version = "v1",
        Title = "Tasks API",
        Description = "API for managing tasks"
    });
    option.SwaggerDoc("projects", new OpenApiInfo
    {
        Version = "v1",
        Title = "Projects API",
        Description = "API for managing projects"
    });
    option.SwaggerDoc("status-priority", new OpenApiInfo
    {
        Version = "v1",
        Title = "Status & Priority API",
        Description = "API for managing status-priority"
    });
    option.SwaggerDoc("users", new OpenApiInfo
    {
        Version = "v1",
        Title = "Users API",
        Description = "API for managing User data"
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = @"https://dev-2kfsaye6ipkg4zd8.us.auth0.com";
            options.Audience = @"https://tms-auth0-api";

            options.TokenValidationParameters = new TokenValidationParameters
            {
                // Validate the issuer of the token
                ValidateIssuer = true,
                ValidIssuer = @"https://dev-2kfsaye6ipkg4zd8.us.auth0.com",

                // Validate the audience of the token
                ValidateAudience = true,
                ValidAudience = @"https://tms-auth0-api",

                // Validate the token's lifetime
                ValidateLifetime = true
            };
        });

builder.Services.AddAuthorization(options =>
{
    // Add a policy to check if the user has a valid token
    options.AddPolicy("RequireValidToken", policy =>
        policy.RequireAuthenticatedUser());
});

builder.Services.Configure<ConnectionStringOptions>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddSingleton<ITasksService, TasksService>();
builder.Services.AddSingleton<ITasksRepository, TasksRepository>();
builder.Services.AddSingleton<IProjectService, ProjectService>();
builder.Services.AddSingleton<IProjectRepository, ProjectRepository>();
builder.Services.AddSingleton<IStatusPriorityService, StatusPriorityService>();
builder.Services.AddSingleton<IStatusPriorityRepository, StatusPriorityRepository>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();

builder.Services.AddCors(options => options.AddPolicy("AllowLocalHostAngular",
    builder =>
    {
        builder.WithOrigins("http://localhost:4200")  // Allow Angular app only
               .AllowAnyMethod()
               .AllowAnyHeader();
    }));

var app = builder.Build();

app.UseCors("AllowLocalHostAngular");

// Configure the HTTP request pipeline
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();    
    app.UseSwaggerUI(option =>
    {
        option.SwaggerEndpoint("/swagger/tasks/swagger.json", "Task APIs");
        option.SwaggerEndpoint("/swagger/projects/swagger.json", "Project APIs");
        option.SwaggerEndpoint("/swagger/status-priority/swagger.json", "Status & Priority APIs");
        option.SwaggerEndpoint("/swagger/users/swagger.json", "Users APIs");
        option.RoutePrefix = string.Empty;
    });
}

app.MapControllers();

app.Run();
