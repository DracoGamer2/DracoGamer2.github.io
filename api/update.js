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

        const currentTime = Date.now();
        const lastUpdate = data[name].lastUpdate || 0;
        const tenHoursInMs = 10 * 60 * 60 * 1000;

        if (currentTime - lastUpdate < tenHoursInMs) {
            return res.status(429).json({ error: 'Solo puedes sumar a este contador cada 10 horas.' });
        }

        // Incrementamos el contador
        data[name].count++;
        data[name].lastUpdate = currentTime;

        // Guardamos el estado actualizado en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        // Devolvemos la respuesta con los datos actualizados
        res.status(200).json({ success: true, name, count: data[name].count });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
