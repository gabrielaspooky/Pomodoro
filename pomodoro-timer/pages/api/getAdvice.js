import clientPromise from '../../src/lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('productive_advice');  // Asegúrate de que el nombre sea el correcto
    const collection = db.collection('advices'); // Usa solo el nombre de la colección sin puntos

    // Obtener el primer documento
    const result = await collection.findOne({});

    // Manejar el caso en el que no se encuentre el documento
    if (!result) {
      return res.status(404).json({ error: "No se encontraron consejos" });
    }

    // Obtener los consejos del campo 'productive_advice'
    const consejos = result.productive_advice;

    // Devolver los consejos
    res.status(200).json({ consejos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos' });
  }
}
