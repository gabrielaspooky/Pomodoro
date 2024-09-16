export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt es requerido' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      throw new Error(errorData.error.message || 'Error desconocido');
    }

    const data = await response.json();
    const advice = data.choices[0]?.text.trim() || 'No se recibió consejo';

    return res.status(200).json({ advice });
  } catch (error) {
    console.error('Error al obtener el consejo:', error.message);
    return res.status(500).json({ error: 'Ocurrió un error al obtener el consejo.' });
  }
}
