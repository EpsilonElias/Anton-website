import React, { useState, useEffect } from 'react';

const ImageDebugger = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const testUrls = [
    {
      name: "Direct GridFS URL",
      url: "https://dr-serzhans-psycare.onrender.com/api/gridfs/68b12f60874e116ce5992ccc",
      description: "Direct access to your GridFS stored image"
    },
    {
      name: "images.weserv.nl Proxy with GridFS", 
      url: "https://images.weserv.nl/?url=https%3A%2F%2Fdr-serzhans-psycare.onrender.com%2Fapi%2Fgridfs%2F68b12f60874e116ce5992ccc&w=800&q=85",
      description: "GridFS image through proxy service"
    },
    {
      name: "AllOrigins Proxy with GridFS",
      url: "https://api.allorigins.win/raw?url=https://dr-serzhans-psycare.onrender.com/api/gridfs/68b12f60874e116ce5992ccc",
      description: "GridFS image through alternative proxy"
    },
    {
      name: "Test Image (Control)",
      url: "https://via.placeholder.com/400x200/4CAF50/white?text=Working+Image",
      description: "Simple test image to verify rendering works"
    }
  ];

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (let i = 0; i < testUrls.length; i++) {
      const test = testUrls[i];
      const result = {
        ...test,
        index: i + 1,
        loadSuccess: false,
        fetchSuccess: false,
        fetchError: null,
        loadError: null,
        loadTime: null,
        fetchResponse: null
      };

      console.log(`\n🔍 Testing ${result.index}: ${result.name}`);
      console.log(`URL: ${result.url}`);

      // Test 1: Fetch the URL
      try {
        const startTime = Date.now();
        const response = await fetch(result.url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit'
        });
        
        result.fetchSuccess = true;
        result.fetchResponse = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          type: response.type,
          ok: response.ok
        };
        
        console.log(`✅ Fetch successful:`, result.fetchResponse);
        
      } catch (error) {
        result.fetchError = error.message;
        console.error(`❌ Fetch failed:`, error);
      }

      // Test 2: Load as image
      try {
        await new Promise((resolve, reject) => {
          const img = new Image();
          const startTime = Date.now();
          
          img.onload = () => {
            result.loadSuccess = true;
            result.loadTime = Date.now() - startTime;
            console.log(`✅ Image load successful in ${result.loadTime}ms`);
            resolve();
          };
          
          img.onerror = (error) => {
            result.loadError = error.message || 'Image load failed';
            console.error(`❌ Image load failed:`, error);
            reject(error);
          };
          
          img.crossOrigin = 'anonymous';
          img.src = result.url;
          
          // Timeout after 10 seconds
          setTimeout(() => {
            if (!result.loadSuccess) {
              result.loadError = 'Timeout after 10 seconds';
              reject(new Error('Timeout'));
            }
          }, 10000);
        });
      } catch (error) {
        // Error already handled in onerror
      }

      setTestResults(prev => [...prev, result]);
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsRunning(false);
    console.log('\n🏁 All tests completed');
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runTests();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <h2>🔍 Image Loading Debug Tool</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runTests} 
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            backgroundColor: isRunning ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {testResults.map((result) => (
          <div key={result.index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: 'white'
          }}>
            <h3 style={{ 
              margin: '0 0 10px 0',
              color: result.loadSuccess ? '#4CAF50' : '#f44336'
            }}>
              Test {result.index}: {result.name} {result.loadSuccess ? '✅' : '❌'}
            </h3>
            
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
              {result.description}
            </p>
            
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>
              <strong>URL:</strong> 
              <div style={{ 
                wordBreak: 'break-all', 
                backgroundColor: '#f0f0f0', 
                padding: '5px', 
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}>
                {result.url}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {/* Fetch Results */}
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                  Fetch Test {result.fetchSuccess ? '✅' : '❌'}
                </h4>
                {result.fetchSuccess ? (
                  <div style={{ fontSize: '12px' }}>
                    <div>Status: {result.fetchResponse.status} {result.fetchResponse.statusText}</div>
                    <div>Type: {result.fetchResponse.type}</div>
                    <div>OK: {result.fetchResponse.ok ? 'Yes' : 'No'}</div>
                  </div>
                ) : (
                  <div style={{ color: '#f44336', fontSize: '12px' }}>
                    Error: {result.fetchError || 'Unknown error'}
                  </div>
                )}
              </div>

              {/* Image Load Results */}
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                  Image Load Test {result.loadSuccess ? '✅' : '❌'}
                </h4>
                {result.loadSuccess ? (
                  <div style={{ fontSize: '12px' }}>
                    <div>Load time: {result.loadTime}ms</div>
                    <div style={{ marginTop: '5px' }}>
                      <img 
                        src={result.url} 
                        alt="Test result"
                        style={{ 
                          maxWidth: '100px', 
                          maxHeight: '60px', 
                          border: '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ color: '#f44336', fontSize: '12px' }}>
                    Error: {result.loadError || 'Unknown error'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>📋 Instructions:</h4>
        <ol style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Check the browser console for detailed error messages</li>
          <li>Note which URLs work vs fail</li>
          <li>Look for specific error types (CORS, network, timeout)</li>
          <li>Compare fetch vs image load results</li>
        </ol>
      </div>
    </div>
  );
};

export default ImageDebugger;
