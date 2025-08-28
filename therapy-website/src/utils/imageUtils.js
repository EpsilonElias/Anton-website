// Utility functions for handling images with CORS issues

export const createImageWithFallback = (src, alt, onLoad, onError) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = onLoad;
  img.onerror = (e) => {
    console.error('Image failed to load:', src, e);
    // Try without crossOrigin as fallback
    const fallbackImg = new Image();
    fallbackImg.src = src;
    fallbackImg.onload = onLoad;
    fallbackImg.onerror = onError;
  };
  img.src = src;
  return img;
};

export const testImageUrl = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(true);
    img.onerror = () => {
      // Try without crossOrigin
      const fallbackImg = new Image();
      fallbackImg.src = url;
      fallbackImg.onload = () => resolve(true);
      fallbackImg.onerror = () => resolve(false);
    };
    img.src = url;
  });
};

export const processImageUrl = (src) => {
  if (!src) return null;
  
  // If src is already absolute, return as is
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }
  
  // If src is relative, make it absolute using the API base
  const baseUrl = 'https://dr-serzhans-psycare.onrender.com';
  return src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
};
