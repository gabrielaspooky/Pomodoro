import clientPromise from '../../../pomodoro-timer/src/lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('productive_advice'); 
    const collection = db.collection('productive_advice.advices'); 

    
    const result = await collection.findOne({});

    if (!result) {
      return res.status(404).json({ error: "No se encontraron consejos" });
    }

    
    const consejos = result.productive_advice;


    res.status(200).json({ consejos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos' });
  }
}

