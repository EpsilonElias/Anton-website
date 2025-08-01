const isLocalhost = window.location.hostname === 'localhost';

export const API_BASE = isLocalhost
  ? 'http://localhost:3000'
  : process.env.REACT_APP_API_URL || 'https://hungry-equally-lewis-disciplinary.trycloudflare.com/';
