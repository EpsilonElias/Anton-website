import React from 'react';

const SimpleImageTest = () => {
  const testUrls = [
    // Test with CORS anywhere (if available)
    'https://cors-anywhere.herokuapp.com/https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
    // Try with allorigins proxy
    'https://api.allorigins.win/raw?url=https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
    // Original weserv proxy  
    'https://images.weserv.nl/?url=https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg&w=800&q=85',
    // Test with a known working image to verify proxy services work
    'https://images.weserv.nl/?url=https://httpbin.org/image/jpeg&w=400',
    // Direct URL (will likely fail but good for comparison)
    'https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
    // Test with different image format
    'https://via.placeholder.com/400x300/4CAF50/white?text=Test+Image'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>Image Proxy Test</h3>
      {testUrls.map((url, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <p><strong>Test {index + 1}:</strong></p>
          <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>{url}</p>
          <img
            src={url}
            alt={`Test ${index + 1}`}
            style={{
              maxWidth: '300px',
              height: 'auto',
              border: '1px solid #ddd'
            }}
            onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
            onError={(e) => console.error(`Image ${index + 1} failed:`, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleImageTest;
