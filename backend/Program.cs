using backend.Models;
using backend.Repositories;
using backend.Repositories.Sql;
using backend.Services;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
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
});

builder.Services.Configure<ConnectionStringOptions>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddSingleton<ITasksService, TasksService>();
builder.Services.AddSingleton<ITasksRepository, TasksRepository>();
builder.Services.AddSingleton<IProjectService, ProjectService>();
builder.Services.AddSingleton<IProjectRepository, ProjectRepository>();
builder.Services.AddSingleton<IStatusPriorityService, StatusPriorityService>();
builder.Services.AddSingleton<IStatusPriorityRepository, StatusPriorityRepository>();

builder.Services.AddCors(options => options.AddPolicy("AllowLocalHostAngular",
    builder =>
    {
        builder.WithOrigins("http://localhost:4200")  // Allow Angular app only
               .AllowAnyMethod()
               .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();    
    app.UseSwaggerUI(option =>
    {
        option.SwaggerEndpoint("/swagger/tasks/swagger.json", "Task APIs");
        option.SwaggerEndpoint("/swagger/projects/swagger.json", "Project APIs");
        option.SwaggerEndpoint("/swagger/status-priority/swagger.json", "Status & Priority APIs");
        option.RoutePrefix = string.Empty;
    });
    app.UseCors("AllowLocalHostAngular");
}

app.UseAuthorization();

app.MapControllers();

app.Run();
