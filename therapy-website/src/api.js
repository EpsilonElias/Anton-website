const isLocalhost = window.location.hostname === 'localhost';

export const API_BASE = isLocalhost
  ? 'http://localhost:3000' // Your local Payload server
  : (process.env.REACT_APP_API_URL 
    || 'https://spirits-machinery-affiliation-talk.trycloudflare.com/'
    || 'https://dr-serzhans-psycare.onrender.com'); // fallback production URL
