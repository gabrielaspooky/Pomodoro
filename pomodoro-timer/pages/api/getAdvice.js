import clientPromise from '../../src/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('breakTimeAdvice');
    const collection = db.collection('BreakTimeTips');
    
    const result = await collection.findOne({});

    if (!result) {
      return res.status(404).json({ error: "No se encontraron consejos" });
    }

    if (!Array.isArray(result.consejos)) {
      return res.status(500).json({ error: "Formato de datos incorrecto" });
    }

    res.status(200).json({ consejos: result.consejos });
  } catch (error) {
    console.error("Error en getAdvice:", error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos', details: error.message });
  }
}
