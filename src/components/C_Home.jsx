import React, { useState, useEffect } from "react";
import search from "./Assets/search.png";
import clearIcon from './Assets/clear.png' 
import cloud from "./Assets/cloud.png";
import drizzle from "./Assets/drizzle.png";
import humidityIcon from "./Assets/humidity.png";
import rain from "./Assets/rain.png";
import snow from "./Assets/snow.png";
import windIcon from "./Assets/wind.png";

export default function C_Home() {
  // Ma clé API
  const API_KEY = "9f2e1f455e003246d00a9c41b725bbc8";

  // Je gère l'état pour les icônes correspondantes
  const [windic, setWindic] = useState(clearIcon);

  // Je gère l'état local pour la valeur de l'input
  const [cityInput, setCityInput] = useState("");

  // Je gère l'état pour les données météo
  const [weatherData, setWeatherData] = useState({
    main: { humidity: 0 },
    wind: { speed: 0 },
    name: "Libreville",
    weather: [{ icon: "01d" }]
  });

  useEffect(() => {
    // Quand les données météo changent, je mets à jour l'icône du vent
    updateWindIcon();
  }, [weatherData]);

  // Fonction pour mettre à jour l'icône du vent en fonction des données météo
  const updateWindIcon = () => {
    const weatherIcon = weatherData.weather[0].icon;

    if (weatherIcon === "01d" || weatherIcon === "01n") {
      setWindic(clearIcon);
    } else if (weatherIcon === "02d" || weatherIcon === "02n") {
      setWindic(cloud);
    } else if (weatherIcon === "03d" || weatherIcon === "03n" || weatherIcon === "04d" || weatherIcon === "04n") {
      setWindic(drizzle);
    } else if (weatherIcon === "09d" || weatherIcon === "09n" || weatherIcon === "10d" || weatherIcon === "10n") {
      setWindic(rain);
    } else if (weatherIcon === "13d" || weatherIcon === "13n") {
      setWindic(snow);
    } else {
      setWindic(clearIcon);
    }
  };

  // Quand je clique sur le bouton de recherche, je déclenche cette fonction
  const searchIcon = async () => {
    // Si la valeur de l'input est vide, je ne fais rien
    if (cityInput === "") {
      return;
    }

    // Je construis l'URL pour l'API météo
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}`;

    // J'effectue une requête fetch pour obtenir les données météo
    let res = await fetch(url);
    let data = await res.json();

    // Je mets à jour l'état des données météo
    setWeatherData(data);
  };

  // Quand j'appuie sur la touche "Enter" dans l'input, je déclenche cette fonction
  const handleKeyPress = (event) => {
    // Si la touche appuyée est "Enter", je déclenche la fonction de recherche
    if (event.key === "Enter") {
      searchIcon();
    }
  };

  // Rendu de l'interface utilisateur
  return (
    <>
      {/* Mon application de météo */}
      <div className="container w-96 h-screen">
        {/* Titre */}
        <p className="text-center text-white pt-4 text-xl titre">
          Fine Tech Météo App
        </p>
        {/* Input de recherche */}
        <div className="top-bar flex justify-center pt-5 gap-4 place-items-center">
          {/* Input de type texte avec gestion des changements et de la touche "Enter" */}
          <input
            type="text"
            className="cityInput"
            placeholder="Recherche"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {/* Bouton de recherche avec évènement au clic */}
          <div className="search" onClick={searchIcon}>
            <img src={search} alt="#" />
          </div>
        </div>
        {/* Récupération de l'image sur le temps qu'il fait */}
        <div className="weather-image pt-10 m-auto flex justify-center">
          <img src={windic} alt="#" />
        </div>
        {/* Température */}
        <div className="weather-temp">{weatherData.main.temp}°C</div>
        {/* Lieu */}
        <div className="weather-location">{weatherData.name}</div>
        {/* Les données sont affichées ici */}
        <div className="data-container">
          {/* Élément pour l'humidité */}
          <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{weatherData.main.humidity}%</div>
              <div className="text">Humidité</div>
            </div>
          </div>

          {/* Élément pour la vitesse du vent */}
          <div className="element">
            <img src={windIcon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">{weatherData.wind.speed} Km/H</div>
              <div className="text">Vitesse</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
