import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    // Leer el archivo state.json
    const data = JSON.parse(fs.readFileSync('./state.json', 'utf-8'));

    if (!data[name]) {
      return res.status(400).json({ error: 'Nombre no válido' });
    }

    // Incrementar el contador
    data[name].count += 1;

    // Guardar el archivo actualizado
    fs.writeFileSync('./state.json', JSON.stringify(data, null, 2));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
