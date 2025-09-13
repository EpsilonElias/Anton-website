import React from 'react';
import BasicImage from './BasicImage';

const HtmlContent = ({ htmlContent }) => {
  if (!htmlContent) return null;

  // Parse HTML and replace img tags with SafeImage components
  const parseHtmlWithImages = (html) => {
    // Split by img tags
    const parts = html.split(/(<img[^>]*>)/g);
    
    return parts.map((part, index) => {
      // Check if this part is an img tag
      const imgMatch = part.match(/<img([^>]*)>/);
      
      if (imgMatch) {
        // Extract attributes from img tag
        const attributes = imgMatch[1];
        const srcMatch = attributes.match(/src=["']([^"']*)["']/);
        const altMatch = attributes.match(/alt=["']([^"']*)["']/);
        const styleMatch = attributes.match(/style=["']([^"']*)["']/);
        
        if (srcMatch) {
          let src = srcMatch[1];
          const alt = altMatch ? altMatch[1] : 'Image';
          
          // Use direct image access - no proxy to avoid OpaqueResponseBlocking
          let directSrc = src;
          // Ensure absolute URL
          if (!src.startsWith('http')) {
            const baseUrl = 'https://dr-serzhans-psycare.onrender.com';
            directSrc = src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
          } else {
            directSrc = src;
          }
          
          // Parse style
          let styleObj = {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: '20px 0',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          };
          
          if (styleMatch) {
            const styleStr = styleMatch[1];
            const styleProps = styleStr.split(';').reduce((acc, prop) => {
              const [key, value] = prop.split(':').map(s => s.trim());
              if (key && value) {
                // Convert CSS property names to camelCase
                const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                acc[camelKey] = value;
              }
              return acc;
            }, {});
            styleObj = { ...styleObj, ...styleProps };
          }
          
          return (
            <BasicImage
              key={index}
              src={directSrc}
              alt={alt}
              style={styleObj}
            />
          );
        }
      }
      
      // If not an img tag, render as HTML
      if (part.trim()) {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div>
      {parseHtmlWithImages(htmlContent)}
    </div>
  );
};

export default HtmlContent;
