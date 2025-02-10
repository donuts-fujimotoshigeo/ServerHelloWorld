var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Root Hello World!");

app.MapGet("/api/hello", () => "Hello World!");

app.MapGet("/api/hello/{name}", (string name) => $"Hello {name}! From GET");

app.MapPost("/api/hello", (string name) => $"Hello {name}! From POST");

app.Run();
