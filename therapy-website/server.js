const express = require('express');
const path = require('path');
const app = express();

// Set correct MIME types for static files
app.use('/static/js', express.static(path.join(__dirname, 'build/static/js'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.use('/static/css', express.static(path.join(__dirname, 'build/static/css'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Serve other static files normally
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - send all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});