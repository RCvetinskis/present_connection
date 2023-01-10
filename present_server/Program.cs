using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Models;
using present_server.Data;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text.Json;


var builder = WebApplication.CreateBuilder(args);

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "https://lively-bay-009ab1403.2.azurestaticapps.net");
        
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{

    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET Presenet connection backend", Version = "v1" });
});

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI( swaggerUiOptions =>
{
    swaggerUiOptions.DocumentTitle = "ASP.NET Pressent connection backend";
    swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API SERVING POST MODEL");
    swaggerUiOptions.RoutePrefix = string.Empty;
});


app.UseHttpsRedirection();

app.UseCors("CORSPolicy");


// routes



// 10 cars per page to frontend
 app.MapGet("/api/cars", async (int page, int rowsPerPage) =>
{
    var cars = await PostsRepository.CarsPerPage(page , rowsPerPage);
    if (cars !=null)
    {
  
        var paginatedCars = cars.Skip((page - 1) * rowsPerPage).Take(rowsPerPage).ToList();
         return Results.Ok(paginatedCars);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");
//cars count for pagination
app.MapGet("/api/cars/count", async () => await PostsRepository.GetCarsAsync())
.WithTags("Posts Endpoints");


//get single car
app.MapGet("/api/car/{carId}", async(int carId) =>
{
    Car carToReturn = await PostsRepository.GetCarByIdAsync(carId);
    
    if(carToReturn != null)
    {
        return Results.Ok(carToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");




// post car
app.MapPost("/api/post", async (Car carToCreate) =>
{

    bool createSuccessful = await PostsRepository.CreatePostAsync(carToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Post created successfuly");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");



// put car
app.MapPut("/api/update", async (Car postToUpdate) =>
{

    bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Post updated successfuly");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");





// delete car
app.MapDelete("/api/delete/{carId}", async (int carId) =>
{

    bool deleteSuccessful = await PostsRepository.DeletePostAsync(carId);

    if (deleteSuccessful)
    {
        return Results.Ok("Deleted successfuly");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.Run();

