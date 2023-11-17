import React, { useState, useEffect } from 'react';

const AddPlanet = ({ planetList, onAddPlanet }) => {
  const [planetId, setPlanetId] = useState('');
  const [error, setError] = useState(false);
  const [registeredPlanets, setRegisteredPlanets] = useState([]);

  useEffect(() => {
    async function fetchRegisteredPlanets() {
      try {
        const response = await fetch('http://localhost:3005/registeredPlanets');
        const data = await response.json();

        if (response.ok) {
          setRegisteredPlanets(data);
        }
      } catch (error) {
        console.error('Error fetching registered planets:', error);
      }
    }

    fetchRegisteredPlanets();
  }, []);

  const handleInputChange = (event) => {
    setPlanetId(event.target.value);
    setError(false);
  };

  const checkIfPlanetExists = async (planetId) => {
    try {
      const response = await fetch(`https://swapi.dev/api/planets/${planetId}/`);
      const data = await response.json();

      if (response.ok && data.name) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking planet existence:', error);
      return false;
    }
  };

  const handleAddPlanet = async () => {
    if (planetId.trim() !== '') {
      const planetExists = await checkIfPlanetExists(planetId);

      if (!planetExists || registeredPlanets.includes(Number(planetId))) {
        setError(true);
        return;
      }

      onAddPlanet(Number(planetId));
      setPlanetId('');
    }
  };

  return (
    <div>
      <h2>Add a planet</h2>
      <input
        type="text"
        placeholder="Planet ID"
        value={planetId}
        onChange={handleInputChange}
        style={{
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: '#b0b0b0',
            borderStyle: 'solid',
            padding: '4px 10px',
          }}
      />
      <button style={{
            borderRadius: 3,
            borderStyle: 'none',
            backgroundColor: '#348c26',
            color: '#ffffff',
            padding: '4px 10px',
            cursor: 'pointer'
          }}
          onClick={handleAddPlanet} >Add</button>

      {error ? (
        <div>
          <h3>This planet does not exist or is already registered.</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddPlanet;
