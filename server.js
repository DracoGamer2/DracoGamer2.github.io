const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

// Configuración inicial del estado
const stateFilePath = path.join(__dirname, 'state.json');

// Middleware y configuración
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Ruta para obtener el estado
app.get('/api/state', (req, res) => {
    fs.readFile(stateFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de estado' });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para actualizar los contadores
app.post('/api/update', (req, res) => {
    const { name, count } = req.body;
    fs.readFile(stateFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de estado' });
        }

        const state = JSON.parse(data);

        if (state[name] === undefined) {
            return res.status(400).json({ error: 'Nombre no válido' });
        }

        // Actualizar el contador
        state[name] = count;

        // Guardar el nuevo estado en el archivo
        fs.writeFile(stateFilePath, JSON.stringify(state, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el archivo de estado' });
            }
            res.json({ success: true });
        });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
