# Usa la imagen oficial de .NET SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia los archivos del proyecto y restaura dependencias
COPY *.csproj ./
RUN dotnet restore

# Copia todo lo demás y compila
COPY . ./
RUN dotnet publish -c Release -o out

# Imagen final para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Configura el puerto que usa Render
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

# El nombre debe coincidir con tu .csproj
ENTRYPOINT ["dotnet", "backend.dll"]