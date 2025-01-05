export default function handler(req, res) {
  const state = {
    Julen: { count: 0 },
    Marsi: { count: 0 },
    Pitu: { count: 0 },
    Unax: { count: 0 },
    "Aratz A": { count: 0 },
    "Aratz E": { count: 0 },
    Enaitz: { count: 0 },
    Aimar: { count: 0 },
    Eneko: { count: 0 }
  };

  if (req.method === "GET") {
    return res.status(200).json(state);
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
