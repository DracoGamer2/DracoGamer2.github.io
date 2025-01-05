import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'state.json');
    
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.status(200).json(data);
    } else {
        res.status(404).json({ error: "El archivo 'state.json' no se encuentra" });
    }
}
