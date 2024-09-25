import clientPromise from '../../src/lib/mongodb'; // Asegúrate de que esta ruta sea correcta

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('breakTimeAdvice');
    const collection = db.collection('BreakTimeTips');
    
    // Puedes ajustar esta consulta según tus necesidades
    const result = await collection.findOne({});

    if (!result) {
      return res.status(404).json({ error: "No se encontraron consejos" });
    }

    const consejos = result.consejos;
    res.status(200).json({ consejos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos' });
  }
}
