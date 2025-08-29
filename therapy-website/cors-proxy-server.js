const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3333;

// Enable CORS for all requests
app.use(cors());

// Create proxy middleware
const proxyMiddleware = createProxyMiddleware({
  target: 'https://dr-serzhans-psycare.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '', // Remove /proxy from the path
  },
  onProxyRes: function (proxyRes, req, res) {
    // Add CORS headers to the response
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
});

// Use proxy middleware for /proxy routes
app.use('/proxy', proxyMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CORS proxy server running' });
});

app.listen(PORT, () => {
  console.log(`CORS proxy server running on http://localhost:${PORT}`);
  console.log(`Proxy images via: http://localhost:${PORT}/proxy/api/media/file/filename.jpg`);
});

module.exports = app;
