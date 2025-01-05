const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Habilitar el uso de JSON en las solicitudes
app.use(express.json());

// Ruta para leer los números almacenados en el archivo .json
app.get('/api/numbers', (req, res) => {
    fs.readFile(path.join(__dirname, 'numbers.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar un número a un nombre
app.post('/api/increment', (req, res) => {
    const { name } = req.body;
    fs.readFile(path.join(__dirname, 'numbers.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        let numbers = JSON.parse(data);
        if (numbers[name] !== undefined) {
            numbers[name]++;
        } else {
            numbers[name] = 1;
        }

        fs.writeFile(path.join(__dirname, 'numbers.json'), JSON.stringify(numbers, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al escribir el archivo');
            }
            res.json({ name, count: numbers[name] });
        });
    });
});

// Servir archivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
