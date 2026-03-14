// Netlify Function - CORS Proxy for Yahoo Finance
exports.handler = async (event, context) => {
  // Get the URL from query parameters
  const targetUrl = event.queryStringParameters.url;
  
  if (!targetUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing url parameter' })
    };
  }
  
  // Only allow Yahoo Finance URLs (security)
  if (!targetUrl.includes('finance.yahoo.com')) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Only Yahoo Finance URLs are allowed' })
    };
  }
  
  try {
    // Fetch from Yahoo Finance
    const response = await fetch(targetUrl);
    const data = await response.text();
    
    // Return with CORS headers
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
