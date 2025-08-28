import React, { useState } from 'react';

const BasicImage = ({ src, alt, style, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    console.log('✅ Image loaded successfully:', src);
    setIsLoading(false);
  };

  const handleError = (e) => {
    console.error('❌ Image failed to load:', src, e);
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        style={{
          ...style,
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          color: '#666'
        }}
      >
        <p>📷 Image unavailable</p>
        <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>{src}</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
          }}
        >
          Loading...
        </div>
      )}
      <img
        src={src}
        alt={alt}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default BasicImage;
