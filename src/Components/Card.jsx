import React from 'react'

const Card = ({ coord, weather, main, wind, name }) => {
    const capitalizedWeather = (weather[0].description).slice(0, 1).toUpperCase() + weather[0].description.slice(1);
    console.log(capitalizedWeather)

    return (
        <section>
            <div className="card mt-5">
                <div className="card-body d-flex gap-5 align-items-center pt-3 pb-2 bg-light text-center">
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} className='' alt="icon" />
                    </div>
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">Longitudine: {coord.lon}</p>
                    <p className="card-text">Latitudine: {coord.lat}</p>
                    <p className="card-text">{capitalizedWeather}</p>
                    <p>Max: {main.temp_max}°C</p>
                    <p>Min: {main.temp_min}°C</p>
                    <p>Umidità: {main.humidity}%</p>
                    <p>Velocità vento: {wind.speed}Km/h</p>
                </div>
            </div>
        </section>
    )
}

export default Card