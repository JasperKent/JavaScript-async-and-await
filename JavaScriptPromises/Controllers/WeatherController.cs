using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JavaScriptPromises.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        public class Pair
        {
            public string City { get; set; }
            public int Temperature { get; set; }
        }

        public IEnumerable<Pair> Get()
        {
            var vals = new Pair[]
            {
                new Pair {City = "London", Temperature = 22 },
                new Pair {City = "New York",   Temperature = 27 },
                new Pair {City = "Madrid",   Temperature = 29 },
                new Pair {City = "Cairo",   Temperature = 32 },
                new Pair {City = "Paris",  Temperature =  23 },
                new Pair {City = "Tokyo",   Temperature = 19 },
                new Pair {City = "New Delhi",   Temperature = 35 }
            };

            return vals;
        }

        [Route("Forecast/{city}")]
        public string Forecast(string city)
        {
            return $"{city} will be sunny";
        }
    }
}