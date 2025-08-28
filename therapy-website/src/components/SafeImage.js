import React, { useState, useEffect } from 'react';

const SafeImage = ({ src, alt, style, onError, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const loadImage = async () => {
      if (!src) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        console.log('Attempting to load image:', src);
        
        // For proxy URLs, load image directly without fetch validation
        if (src.includes('images.weserv.nl') || src.includes('proxy')) {
          const img = new Image();
          
          img.onload = () => {
            if (mounted) {
              console.log('Proxy image loaded successfully:', src);
              setImageSrc(src);
              setIsLoading(false);
            }
          };
          
          img.onerror = (e) => {
            if (mounted) {
              console.error('Proxy image failed to load:', src, e);
              setHasError(true);
              setIsLoading(false);
              if (onError) {
                onError(e);
              }
            }
          };
          
          img.src = src;
          return;
        }
        
        // For non-proxy URLs, try to fetch first to validate
        const response = await fetch(src, { 
          mode: 'no-cors',
          cache: 'default'
        });
        
        console.log('Fetch response status:', response.status, response.type);
        
        // If fetch worked, try to load the image directly
        const img = new Image();
        
        img.onload = () => {
          if (mounted) {
            console.log('Image loaded successfully:', src);
            setImageSrc(src);
            setIsLoading(false);
          }
        };
        
        img.onerror = (e) => {
          if (mounted) {
            console.error('Image failed to load:', src, e);
            setHasError(true);
            setIsLoading(false);
            if (onError) {
              onError(e);
            }
          }
        };
        
        // Try loading without crossOrigin first
        img.src = src;
        
      } catch (error) {
        if (mounted) {
          console.error('Fetch failed, trying direct image load:', error);
          
          // Fallback: Try direct image loading
          const img = new Image();
          
          img.onload = () => {
            if (mounted) {
              console.log('Direct image load successful:', src);
              setImageSrc(src);
              setIsLoading(false);
            }
          };
          
          img.onerror = (e) => {
            if (mounted) {
              console.error('All loading strategies failed:', src, e);
              setHasError(true);
              setIsLoading(false);
              if (onError) {
                onError(e);
              }
            }
          };
          
          img.src = src;
        }
      }
    };

    loadImage();
    
    return () => {
      mounted = false;
    };
  }, [src, onError]);

  if (isLoading) {
    return (
      <div 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f8f8',
          color: '#666',
          fontSize: '14px',
          minHeight: '100px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}
      >
        Loading image...
      </div>
    );
  }

  if (hasError || !imageSrc) {
    return (
      <div 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#666',
          fontSize: '14px',
          minHeight: '100px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          flexDirection: 'column',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '8px' }}>🖼️</div>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Image unavailable</div>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>{alt}</div>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      style={style}
      onLoad={() => console.log('Image rendered successfully:', imageSrc)}
      onError={(e) => {
        console.error('Image render failed:', imageSrc, e);
        setHasError(true);
      }}
    />
  );
};

export default SafeImage;
