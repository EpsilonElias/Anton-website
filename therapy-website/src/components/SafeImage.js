import React, { useState } from 'react';

const SafeImage = ({ src, alt, style, onError, ...props }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    console.error('Image failed to load:', src);
    setHasError(true);
    
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', src);
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
          minHeight: '100px'
        }}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default SafeImage;
