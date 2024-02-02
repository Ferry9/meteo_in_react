import React, { useState } from "react";
import search from "./Assets/search.png";
// import clear from './Assets/clear.png' // Commenté car non utilisé dans le code
import cloud from "./Assets/cloud.png";
import drizzle from "./Assets/drizzle.png"; // Image non utilisée dans le code
import humidityIcon from "./Assets/humidity.png";
import rain from "./Assets/rain.png"; // Image non utilisée dans le code
import snow from "./Assets/snow.png"; // Image non utilisée dans le code
import windIcon from "./Assets/wind.png";

export default function C_Home() {
  // Ma clé API
  const API_KEY = "9f2e1f455e003246d00a9c41b725bbc8";

  // Je gère l'état local pour la valeur de l'input
  const [cityInput, setCityInput] = useState("");

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

    // Je sélectionne les éléments HTML où injecter les données météo
    const humidityPercent = document.getElementsByClassName("humidity-percent");
    const windRate = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    /**
     * *********************************
     * Injection des données sur la page
     * *********************************
     */
    // J'injecte l'humidité dans le document HTML
    humidityPercent[0].innerHTML = data.main.humidity;
    // J'injecte la vitesse du vent dans le document HTML
    windRate[0].innerHTML = data.wind.speed;
    // J'injecte la température dans le document HTML
    temperature[0].innerHTML = data.main.temp;
    // J'injecte le nom de la ville dans le document HTML
    location[0].innerHTML = data.name;
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
          Application Météo
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
          <img src={cloud} alt="#" />
        </div>
        {/* Température */}
        <div className="weather-temp">24°C</div>
        {/* Lieu */}
        <div className="weather-location">Libreville</div>
        {/* Les données sont affichées ici */}
        <div className="data-container">
          {/* Élément pour l'humidité */}
          <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidité</div>
            </div>
          </div>

          {/* Élément pour la vitesse du vent */}
          <div className="element">
            <img src={windIcon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 Km/H</div>
              <div className="text">Vitesse</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
