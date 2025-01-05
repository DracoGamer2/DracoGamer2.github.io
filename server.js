const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const stateFilePath = path.join(__dirname, 'state.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API para obtener el estado
app.get('/api/state', (req, res) => {
    fs.readFile(stateFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo de estado." });
        }
        res.json(JSON.parse(data));
    });
});

// API para actualizar el contador
app.post('/api/update', (req, res) => {
    const { name } = req.body;

    fs.readFile(stateFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer el archivo de estado." });
        }

        const state = JSON.parse(data);

        if (!state[name]) {
            return res.status(400).json({ error: "Nombre no válido" });
        }

        state[name].count++;

        fs.writeFile(stateFilePath, JSON.stringify(state, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "No se pudo actualizar el archivo de estado." });
            }

            res.json({ success: true });
        });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
