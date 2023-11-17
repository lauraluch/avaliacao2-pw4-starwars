const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: ['http://localhost:3000']
}));

const planetList = []

function addPlanet(planetId) {
    try {

        planetList.push(planetId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

app.post('/addPlanet', async (req, res) => {
    const {planetId} = req.body;
    const success = addPlanet(planetId);

    
    if (success) {
        res.status(200).send('Planet added successfully!');
    } else {
        res.status(400).send('Failed to add planet.');
    }
});

app.get('/registeredPlanets', (req, res) => {
    res.status(200).json(planetList);
});

app.delete('/removePlanet/:planetId', (req, res) => {
    const planetIdToRemove = req.params.planetId;

    try {
        const planetIdToRemoveNumber = parseInt(planetIdToRemove);

        const index = planetList.indexOf(planetIdToRemoveNumber);
        if (index !== -1) {
            planetList.splice(index, 1);
            res.status(200).send('Planet removed successfully!');
        } else {
            res.status(404).send('Planet not found in the list.');
        }
    } catch (error) {
        console.error('Error removing planet:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/', (req, res) => {
    res.send("Star Wars Planets server");
})

app.listen(3005, () => {
    console.log("Server running on port 3005");
})