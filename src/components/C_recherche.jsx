import React, { useState } from 'react';

const MonFormulaire = () => {
  const [recherche, setRecherche] = useState('');

  const handleRechercheChange = (e) => {
    setRecherche(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici le code pour traiter la recherche (par exemple, appel à une API)
    console.log('Recherche soumise :', recherche);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md w-96 flex flex-row items-center">
        <div className="mb-4 w-full">
          <label htmlFor="recherche" className="block text-gray-700 font-bold mb-2">
            Recherche
          </label>
          <input
            type="text"
            id="recherche"
            name="recherche"
            value={recherche}
            onChange={handleRechercheChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Entrez votre recherche..."
          />
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default MonFormulaire;
