import React, { useState } from 'react';

const ImageTester = () => {
  const [testUrl, setTestUrl] = useState('https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg');
  const [testResult, setTestResult] = useState('');

  const testImageUrl = async () => {
    setTestResult('Testing...');
    
    try {
      // Test 1: Fetch request
      const response = await fetch(testUrl, { 
        mode: 'no-cors',
        method: 'GET'
      });
      console.log('Fetch response:', response);
      
      // Test 2: Image load test
      const img = new Image();
      img.onload = () => {
        setTestResult('✅ Image loads successfully');
        console.log('Image loaded successfully');
      };
      img.onerror = (e) => {
        setTestResult('❌ Image failed to load: ' + e.message);
        console.error('Image failed to load:', e);
      };
      img.src = testUrl;
      
    } catch (error) {
      setTestResult('❌ Fetch failed: ' + error.message);
      console.error('Fetch failed:', error);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Image URL Tester</h3>
      <input
        type="text"
        value={testUrl}
        onChange={(e) => setTestUrl(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        placeholder="Enter image URL to test"
      />
      <button onClick={testImageUrl} style={{ marginBottom: '10px', padding: '8px 16px' }}>
        Test Image URL
      </button>
      <div style={{ marginBottom: '10px' }}>
        <strong>Result:</strong> {testResult}
      </div>
      <div>
        <strong>Test Image:</strong>
        <br />
        <img 
          src={testUrl} 
          alt="Test" 
          style={{ maxWidth: '300px', marginTop: '10px' }}
          onLoad={() => console.log('Direct img tag loaded')}
          onError={(e) => console.error('Direct img tag failed:', e)}
        />
      </div>
    </div>
  );
};

export default ImageTester;
