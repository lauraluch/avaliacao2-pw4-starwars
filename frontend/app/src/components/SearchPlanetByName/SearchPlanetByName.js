import React, { useState } from 'react';
import PlanetCard from '../PlanetCard/PlanetCard';

function SearchPlanetByName({ planetNames }) {
  const [searchName, setSearchName] = useState('');
  const [planetId, setPlanetId] = useState('');
  const [foundPlanet, setFoundPlanet] = useState(null);

  function handleSearch() {
    const lowercaseSearchName = searchName.toLowerCase();
    const foundPlanetName = planetNames.find(name =>
      name.toLowerCase().includes(lowercaseSearchName)
    );

    setFoundPlanet(foundPlanetName);
  }

  return (
    <div>
      <h2>Search Planet by Name</h2>
      <label>
        Planet Name:
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>

      {foundPlanet ? (
        <PlanetCard planetId={foundPlanet} onRemovePlanet={() => {}} />
      ) : (
        <p>No planet found for the given name.</p>
      )}
    </div>
  );
}

export default SearchPlanetByName;
