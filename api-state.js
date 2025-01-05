import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'state.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const result = Object.keys(data).map((name) => ({
        name,
        count: data[name].count
    }));
    res.status(200).json(result);
}
