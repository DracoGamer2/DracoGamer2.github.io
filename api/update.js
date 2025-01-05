const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { name } = req.body;
    const stateFilePath = path.join(__dirname, '../../state.json');

    try {
        const data = fs.readFileSync(stateFilePath, 'utf8');
        const state = JSON.parse(data);

        if (!state[name]) {
            return res.status(400).json({ error: 'Nombre no válido' });
        }

        state[name].count++;

        fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2));

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'No se pudo actualizar el archivo de estado.' });
    }
};
