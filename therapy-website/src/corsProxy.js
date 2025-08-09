// Simple proxy to handle CORS issues
export const corsProxy = async (url) => {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.contents) {
      return JSON.parse(data.contents);
    }
    
    throw new Error('Proxy response invalid');
  } catch (error) {
    // Fallback: try direct request (might work in some browsers/environments)
    const directResponse = await fetch(url);
    return await directResponse.json();
  }
};
