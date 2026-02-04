var builder = WebApplication.CreateBuilder(args);

// 1. Agregamos los controladores al contenedor
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


// 2. Configuración de CORS para React (Puerto 3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// 3. Habilitamos CORS ANTES de mapear rutas
app.UseCors("AllowReact");

// 4. Mapeamos los controladores (Esto activará tu MobiliariosController)
app.MapControllers();

// Opcional: Esto es solo para que veas algo al entrar a la raíz
app.MapGet("/", () => "API de Mobiliarios funcionando");

app.Run();