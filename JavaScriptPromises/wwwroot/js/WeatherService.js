export class WeatherService{
    constructor() {
        this._cache = null;
    }

    getWeather() {
        if (this._cache === null)
            this._cache = $.ajax({
                url: "/api/weather",
                method: "GET"
            });

        return this._cache;
    }
    
    getForecast(city) {
        return $.ajax({
            url: "/api/weather/forecast/" + city,
            method: "GET"
        });
    }
}