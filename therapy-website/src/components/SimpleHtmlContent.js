import React, { useEffect } from 'react';

const SimpleHtmlContent = ({ htmlContent }) => {
  const processImageUrl = (originalSrc) => {
    console.log('🔍 Processing image URL:', originalSrc);
    
    // NEVER use proxy - always return direct URLs
    if (originalSrc && originalSrc.includes('images.weserv.nl')) {
      // If it's a proxy URL, extract the original
      try {
        const urlParams = new URLSearchParams(originalSrc.split('?')[1]);
        const decodedUrl = decodeURIComponent(urlParams.get('url'));
        console.log('📤 Extracted original URL from proxy:', decodedUrl);
        return decodedUrl; // Return the original URL without proxy
      } catch (e) {
        console.warn('Failed to decode proxy URL:', originalSrc);
        return originalSrc;
      }
    }
    
    // For direct URLs, ensure they're absolute but don't proxy them
    if (originalSrc && !originalSrc.startsWith('http')) {
      const baseUrl = 'https://dr-serzhans-psycare.onrender.com';
      const absoluteUrl = originalSrc.startsWith('/') ? `${baseUrl}${originalSrc}` : `${baseUrl}/${originalSrc}`;
      console.log('🔗 Made URL absolute:', absoluteUrl);
      return absoluteUrl;
    }
    
    console.log('✅ Using direct URL as-is:', originalSrc);
    return originalSrc; // Return direct URL as-is
  };

  useEffect(() => {
    console.log('SimpleHtmlContent received htmlContent:', htmlContent);
    
    // Process images with dynamic proxy handling
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      const originalSrc = img.src;
      const processedSrc = processImageUrl(originalSrc);
      
      console.log(`Image ${index}:`, { originalSrc, processedSrc });
      
      // Update src if processing changed it
      if (processedSrc !== originalSrc) {
        img.src = processedSrc;
      }
      
      img.onload = () => {
        console.log(`✅ Image ${index} loaded successfully:`, img.src);
      };
      
      img.onerror = () => {
        console.error(`❌ Image ${index} failed to load:`, img.src);
        console.error(`❌ Error details - File: ${img.src.split('/').pop()}, Full URL: ${img.src}`);
        
        // For debugging: try to fetch the image to see the exact error
        fetch(img.src, { method: 'HEAD', mode: 'cors' })
          .then(response => {
            console.log(`📊 Fetch test result for ${img.src}:`, response.status, response.statusText);
            console.log(`📊 Response headers:`, [...response.headers.entries()]);
          })
          .catch(fetchError => {
            console.error(`📊 Fetch test failed for ${img.src}:`, fetchError);
          });
        
        // Try fallback approaches
        if (img.src.includes('dr-serzhans-psycare.onrender.com')) {
          console.log(`🔄 Trying fallback approaches for: ${img.src}`);
          
          // Fallback 1: Try with different path structure
          const fallbackUrl1 = img.src.replace('/api/media/file/', '/media/');
          
          // Fallback 2: Try with /uploads/ path  
          const fallbackUrl2 = img.src.replace('/api/media/file/', '/uploads/');
          
          // Fallback 3: Try GridFS path
          const fallbackUrl3 = img.src.replace('/api/media/file/', '/api/gridfs/');
          
          console.log(`🔄 Testing fallbacks: ${fallbackUrl1}, ${fallbackUrl2}, ${fallbackUrl3}`);
          
          // Try fallback 1
          const testImg1 = new Image();
          testImg1.onload = () => {
            console.log(`✅ Fallback 1 worked: ${fallbackUrl1}`);
            img.src = fallbackUrl1;
          };
          testImg1.onerror = () => {
            // Try fallback 2
            const testImg2 = new Image();
            testImg2.onload = () => {
              console.log(`✅ Fallback 2 worked: ${fallbackUrl2}`);
              img.src = fallbackUrl2;
            };
            testImg2.onerror = () => {
              // Try fallback 3
              const testImg3 = new Image();
              testImg3.onload = () => {
                console.log(`✅ Fallback 3 worked: ${fallbackUrl3}`);
                img.src = fallbackUrl3;
              };
              testImg3.onerror = () => {
                console.error(`❌ All fallbacks failed for: ${img.src}`);
                img.alt = `Image unavailable: ${img.alt || 'Image'}`;
                img.style.display = 'none';
              };
              testImg3.src = fallbackUrl3;
            };
            testImg2.src = fallbackUrl2;
          };
          testImg1.src = fallbackUrl1;
        } else {
          img.alt = `Failed to load: ${img.src}`;
          img.style.display = 'none';
        }
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
