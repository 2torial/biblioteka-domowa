using ASP.NET_store_project.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace biblioteka_domowa.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController(AppDbContext context) : ControllerBase
    {
        private static readonly string[] Summaries = 
            ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

        [HttpGet("/api/weatherforecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
