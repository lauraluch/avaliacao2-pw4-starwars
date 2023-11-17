import React, { useState } from 'react';
import axios from 'axios';
import PlanetCard from '../PlanetCard/PlanetCard';

function SearchPlanet({ planetList }) {
  const [searchId, setSearchId] = useState('');
  const [foundPlanet, setFoundPlanet] = useState(null);

  function handleSearch() {
    const searchIdNumber = Number(searchId);
  
    for (let i = 0; i < planetList.length; i++) {
      if (planetList[i] === searchIdNumber) {
        setFoundPlanet(planetList[i]);
        return;
      }
    }
  
    setFoundPlanet(null);
  }
  


  return (
    <div>
      <h2>Search Planet by ID</h2>
      <label>
        Planet ID:
        <input
          style={{
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#b0b0b0',
            borderStyle: 'solid',
            padding: '4px 10px'
          }}
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </label>
      <button 
        style={{
            borderRadius: 3,
            borderStyle: 'none',
            backgroundColor: '#348c26',
            color: '#ffffff',
            padding: '4px 10px',
            cursor: 'pointer'
          }}
        onClick={handleSearch}>Search</button>

      {foundPlanet ? (
        <PlanetCard planetId={foundPlanet} onRemovePlanet={() => {}} />
      ) : (
        <p>No planet found for the given ID.</p>
      )}
    </div>
  );
}

export default SearchPlanet;
