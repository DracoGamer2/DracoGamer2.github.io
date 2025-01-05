const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const stateFilePath = path.join(__dirname, '../../state.json');
    
    try {
        const data = fs.readFileSync(stateFilePath, 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: 'No se pudo leer el archivo de estado.' });
    }
};
