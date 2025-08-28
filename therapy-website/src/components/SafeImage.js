import React, { useState } from 'react';

const SafeImage = ({ src, alt, style, onError, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e) => {
    console.error('Image failed to load:', src);
    setHasError(true);
    setIsLoading(false);
    
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', src);
    setIsLoading(false);
  };

  if (hasError) {
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
          borderRadius: '8px'
        }}
      >
        Image unavailable: {alt}
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      style={{
        ...style,
        display: isLoading ? 'none' : 'block'
      }}
      onError={handleError}
      onLoad={handleLoad}
      referrerPolicy="no-referrer"
    />
  );
};

export default SafeImage;
