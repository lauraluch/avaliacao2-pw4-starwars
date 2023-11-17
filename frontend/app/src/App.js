import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PlanetCard from './components/PlanetCard/PlanetCard';
import AddPlanet from "./components/AddPlanet/AddPlanet";
import SearchPlanet from "./components/SearchPlanet/SearchPlanet";

function App() {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('http://localhost:3005/registeredPlanets');
        setPlanetList(response.data);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  const addPlanet = async (planetId) => {
    try {
      await axios.post('http://localhost:3005/addPlanet', { planetId });
      setPlanetList([...planetList, planetId]);
    } catch (error) {
      console.error('Error adding planet:', error);
    }
  };

  const removePlanet = async (planetId) => {
    try {
      await axios.delete(`http://localhost:3005/removePlanet/${planetId}`);
      setPlanetList(planetList.filter((id) => id !== planetId));
    } catch (error) {
      console.error('Error removing planet:', error);
    }
  };


  return (
    <div className='container'>

      <div className="title-container">
        <img width={50} height={50} src={"https://i.pinimg.com/originals/90/c6/5a/90c65afdac81eb1ec8fa4f4c84e724ee.png"} alt={"logo"} />
        <h1 style={{marginLeft: 15, paddingBottom: 10}}>Star Wars Planets</h1>
      </div>

      <div className="actions-container">
        <AddPlanet onAddPlanet={addPlanet}/>
        <SearchPlanet planetList={planetList} />
      </div>


      {planetList.map((planetId) => (
        <PlanetCard key={planetId} planetId={planetId} onRemovePlanet={removePlanet}/>
      ))}
    </div>
  );
}

export default App;
