import fs from 'fs';

export default async function handler(req, res) {
  try {
    // Leer el archivo state.json
    const data = JSON.parse(fs.readFileSync('./state.json', 'utf-8'));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron cargar los datos.' });
  }
}
