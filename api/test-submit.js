// Simple test endpoint for score submission
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    console.log('TEST SUBMIT - Request received');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Method:', req.method);
    console.log('URL:', req.url);

    // Simple validation
    const { playerName, score } = req.body;
    
    if (!playerName) {
      return res.status(400).json({
        error: 'Missing playerName',
        received: req.body
      });
    }
    
    if (typeof score !== 'number') {
      return res.status(400).json({
        error: 'Invalid score type',
        received: { score, type: typeof score }
      });
    }

    // Return success
    return res.status(201).json({
      success: true,
      message: 'Test submission successful',
      data: {
        playerName,
        score,
        timestamp: new Date().toISOString()
      }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}