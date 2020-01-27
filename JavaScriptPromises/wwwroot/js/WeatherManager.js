import { WeatherService } from "./WeatherService.js";

class WeatherManager {
    constructor() {
        $("#button-all").click(() => this.getAll());
        $("#button-warmest").click(() => this.getWarmest());

        this._weatherService = new WeatherService();
    }

    getAll() {
        this._weatherService.getWeather()
            .then(
                data => this.displayAll(data),
                data => $("#error-message").text(`An error occurred (${data.status}).`)
            );
    }

    // async only needed if there are any awaits in method
    async getWarmest() {
        //#region Using await and try/catch
        try {
            let weather = await this._weatherService.getWeather();

            let max = weather[0];

            for (let i = 1; i < weather.length; ++i) {
                if (weather[i].temperature > max.temperature)
                    max = weather[i];
            }

            let forecast = await this._weatherService.getForecast(max.city);

            $("#results-warmest").html(`<p>${max.city} - ${max.temperature}°C<br />${forecast}</p>`);
        }
        catch (data) {
            $("#error-message").text(`An error occurred (${data.status}).`);
        }
        //#endregion

        //#region Using chained then()s
        //let max = null;

        //this._weatherService.getWeather()
        //    .then(
        //        weather => {
        //            max = weather[0];

        //            for (let i = 1; i < weather.length; ++i) {
        //                if (weather[i].temperature > max.temperature)
        //                    max = weather[i];
        //            }

        //            return this._weatherService.getForecast(max.city);
        //        }
        //    )
        //    .then(
        //        forecast => $("#results-warmest").html(`<p>${max.city} - ${max.temperature}°C<br />${forecast}</p>`)
        //    )
        //    .catch(
        //        data => $("#error-message").text(`An error occurred (${data.status}).`)
        //);
        //#endregion

        //#region Pyramid of Doom
        //this._weatherService.getWeather()
        //    .then(
        //        weather => {
        //            let max = weather[0];

        //            for (let i = 1; i < weather.length; ++i) {
        //                if (weather[i].temperature > max.temperature)
        //                    max = weather[i];
        //            }

        //            this._weatherService.getForecast(max.city)
        //                .then(
        //                    forecast => $("#results-warmest").html(`<p>${max.city} - ${max.temperature}°C<br />${forecast}</p>`),
        //                    data => $("#error-message").text(`An error occurred (${data.status}).`)
        //                );
        //        },
        //        data => $("#error-message").text(`An error occurred (${data.status}).`)
        //    );
        //#endregion
    }

    displayAll(weather) {
        let html = "";

        for (let i = 0; i < weather.length; ++i)
            html += `<p>${weather[i].city} - ${weather[i].temperature}°C</p>`;

        $("#results-all").html(html);
    }
}

(function () {
    new WeatherManager();
})();