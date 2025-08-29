// Test different proxy services
const testUrls = [
  // Direct URL (will likely fail due to CORS)
  'https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
  
  // Images.weserv.nl (currently blocked)
  'https://images.weserv.nl/?url=https%3A%2F%2Fdr-serzhans-psycare.onrender.com%2Fapi%2Fmedia%2Ffile%2Fforest.jpg&w=800&q=85',
  
  // AllOrigins proxy
  'https://api.allorigins.win/raw?url=https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
  
  // CORS anywhere (may require activation)
  'https://cors-anywhere.herokuapp.com/https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
  
  // Simple test image to verify HTML rendering works
  'https://via.placeholder.com/400x200/4CAF50/white?text=Test+Image'
];

console.log('Testing different proxy services:');
testUrls.forEach((url, index) => {
  console.log(`\n${index + 1}. ${url}`);
});

export { testUrls };
