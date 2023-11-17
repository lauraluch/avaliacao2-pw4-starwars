import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function PlanetCard({ planetId, onRemovePlanet }) {
    const [planetData, setPlanetData] = useState(null);

    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const response = await axios.get(`https://swapi.dev/api/planets/${planetId}/`);
                setPlanetData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do planeta:', error);
            }
        }

        fetchPlanetData();
    }, [planetId]);

    if (!planetData) {
        return <div>Loading...</div>;
    }

    const { name, climate, terrain, population } = planetData;

    return (
        <div className="planet-card">
            <h4>ID: {planetId}</h4>
            <h3>{name}</h3>
            <p className='climate'>Climate: {climate}</p>
            <p className='terrain'>Terrain: {terrain}</p>
            <p className='population'>Population: {population}</p>
            <button onClick={() => onRemovePlanet(planetId)}>Remover</button>
        </div>
    );
}

export default PlanetCard
