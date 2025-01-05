import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name } = req.body;

        const filePath = path.join(process.cwd(), 'state.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!data[name]) {
            return res.status(400).json({ error: 'Nombre no válido' });
        }

        data[name].count++;

        // Guardar el estado actualizado
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
