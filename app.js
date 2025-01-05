const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

// Usar JSON para almacenar los contadores
const stateFile = path.join(__dirname, 'state.json');

// Middleware para manejar JSON en solicitudes
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Ruta para obtener el estado de los contadores
app.get('/api/state', (req, res) => {
  fs.readFile(stateFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo state.json' });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para actualizar el contador de una persona
app.post('/api/update', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Nombre es necesario para actualizar el contador.' });
  }

  // Leer el archivo state.json
  fs.readFile(stateFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo state.json' });
    }

    const state = JSON.parse(data);

    // Si el nombre no existe en el estado
    if (!state[name]) {
      return res.status(400).json({ error: 'El nombre no existe en el estado.' });
    }

    // Incrementar el contador
    state[name]++;

    // Guardar el nuevo estado en el archivo
    fs.writeFile(stateFile, JSON.stringify(state, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo state.json' });
      }
      res.json({ success: true });
    });
  });
});

// Servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en puerto ${PORT}`);
});
