const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

// Ruta principal que recibe el clic
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta que recibe la ubicación
app.post('/capture', (req, res) => {
  const { lat, lon, acc } = req.body;
  const log = `[${new Date().toISOString()}] Lat: ${lat}, Lon: ${lon}, Acc: ${acc}m\n`;
  fs.appendFileSync('log.txt', log);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port', port));