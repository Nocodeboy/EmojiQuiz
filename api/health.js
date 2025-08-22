// Health check endpoint to verify API is working
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Check environment variables
    const hasKvUrl = !!process.env.KV_REST_API_URL;
    const hasKvToken = !!process.env.KV_REST_API_TOKEN;
    
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      node_version: process.version,
      environment: process.env.NODE_ENV || 'unknown',
      kv_config: {
        url_configured: hasKvUrl,
        token_configured: hasKvToken,
        kv_ready: hasKvUrl && hasKvToken
      }
    };

    // Test KV connection if available
    if (hasKvUrl && hasKvToken) {
      try {
        const { kv } = await import('@vercel/kv');
        await kv.ping();
        status.kv_config.connection_test = 'success';
      } catch (kvError) {
        status.kv_config.connection_test = 'failed';
        status.kv_config.error = kvError.message;
      }
    }

    res.status(200).json(status);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}