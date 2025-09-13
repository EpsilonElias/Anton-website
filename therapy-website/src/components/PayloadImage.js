import React, { useState, useEffect } from 'react';
import { getImageURL, getImageSrcSet, getImageDimensions } from '../lib/payloadImageHelpers';

const PayloadImage = ({ 
  media, 
  size = 'small', 
  alt, 
  style,
  className,
  ...props 
}) => {
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!media) {
      setError(true);
      setIsLoading(false);
      return;
    }

    // Get optimized image URL using Payload's system
    const imageUrl = getImageURL(media, size);
    const fallbackUrl = getImageURL(media); // Original as fallback

    if (!imageUrl && !fallbackUrl) {
      setError(true);
      setIsLoading(false);
      return;
    }

    // Try loading optimized version first
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(imageUrl);
      setIsLoading(false);
      setError(false);
      console.log('✅ Payload image loaded:', imageUrl);
    };

    img.onerror = () => {
      console.warn('❌ Optimized image failed, trying fallback:', imageUrl);
      
      // Try fallback if different
      if (fallbackUrl && fallbackUrl !== imageUrl) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setCurrentSrc(fallbackUrl);
          setIsLoading(false);
          setError(false);
          console.log('✅ Fallback image loaded:', fallbackUrl);
        };
        fallbackImg.onerror = () => {
          console.error('❌ Both optimized and fallback failed');
          setError(true);
          setIsLoading(false);
        };
        fallbackImg.src = fallbackUrl;
      } else {
        setError(true);
        setIsLoading(false);
      }
    };

    img.src = imageUrl || fallbackUrl;
  }, [media, size]);

  // Get dimensions for aspect ratio
  const dimensions = getImageDimensions(media, size);
  
  // Loading state
  if (isLoading) {
    return (
      <div 
        className={className}
        style={{
          ...style,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100px',
          color: '#999',
          aspectRatio: dimensions.width && dimensions.height ? 
            `${dimensions.width} / ${dimensions.height}` : 'auto'
        }}
      >
        Loading image...
      </div>
    );
  }

  // Error state
  if (error || !currentSrc) {
    return (
      <div 
        className={className}
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
          textAlign: 'center',
          aspectRatio: dimensions.width && dimensions.height ? 
            `${dimensions.width} / ${dimensions.height}` : 'auto'
        }}
      >
        <div>
          Image unavailable<br />
          <small>{alt || 'No description'}</small>
        </div>
      </div>
    );
  }

  // Successfully loaded image
  const srcSet = getImageSrcSet(media);
  
  return (
    <img
      src={currentSrc}
      srcSet={srcSet}
      alt={alt || media.alt || 'Image'}
      className={className}
      style={style}
      width={dimensions.width}
      height={dimensions.height}
      loading="lazy"
      {...props}
    />
  );
};

export default PayloadImage;