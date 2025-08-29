import React, { useEffect } from 'react';

const SimpleHtmlContent = ({ htmlContent }) => {
  useEffect(() => {
    console.log('SimpleHtmlContent received htmlContent:', htmlContent);
    
    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      console.log(`Image ${index}:`, img.src);
      
      img.onload = () => {
        console.log(`✅ Image ${index} loaded successfully:`, img.src);
      };
      
      img.onerror = () => {
        console.error(`❌ Image ${index} failed to load:`, img.src);
        img.alt = `Failed to load: ${img.src}`;
      };
    });
  }, [htmlContent]);

  if (!htmlContent) return null;

  return (
    <div
      style={{
        lineHeight: '1.6',
        fontSize: '16px'
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default SimpleHtmlContent;
