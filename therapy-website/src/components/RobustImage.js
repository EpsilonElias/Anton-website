import React, { useState, useEffect } from 'react';

const RobustImage = ({ src, alt, style, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate fallback URLs for Payload CMS images
  const generateFallbackUrls = (originalSrc) => {
    if (!originalSrc || !originalSrc.includes('dr-serzhans-psycare.onrender.com')) {
      return [originalSrc];
    }

    const fallbacks = [
      originalSrc, // Original URL
      originalSrc.replace('/api/media/file/', '/media/'),
      originalSrc.replace('/api/media/file/', '/uploads/'),
      originalSrc.replace('/api/media/file/', '/static/'),
      originalSrc.replace('/api/media/file/', '/files/'),
    ];

    return [...new Set(fallbacks)]; // Remove duplicates
  };

  const tryNextFallback = async (urls, index = 0) => {
    if (index >= urls.length) {
      setHasError(true);
      setIsLoading(false);
      console.error('All image URLs failed:', urls);
      return;
    }

    const currentUrl = urls[index];
    console.log(`Trying image URL ${index + 1}/${urls.length}:`, currentUrl);

    try {
      const img = new Image();
      
      img.onload = () => {
        console.log('✅ Image loaded successfully:', currentUrl);
        setCurrentSrc(currentUrl);
        setHasError(false);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        console.log(`❌ Image failed (${index + 1}/${urls.length}):`, currentUrl);
        tryNextFallback(urls, index + 1);
      };
      
      img.src = currentUrl;
    } catch (error) {
      console.error('Error loading image:', currentUrl, error);
      tryNextFallback(urls, index + 1);
    }
  };

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    
    const fallbackUrls = generateFallbackUrls(src);
    tryNextFallback(fallbackUrls);
  }, [src]);

  if (hasError) {
    return (
      <div 
        style={{
          ...style,
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100px',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center'
        }}
      >
        Image unavailable<br />
        <small>{alt}</small>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div 
          style={{
            ...style,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100px',
            color: '#999'
          }}
        >
          Loading...
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        style={{
          ...style,
          display: isLoading ? 'none' : 'block'
        }}
        {...props}
      />
    </>
  );
};

export default RobustImage;