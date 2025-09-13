/**
 * Payload 3.0 Image Helper Functions
 * Proper way to handle images with Payload's built-in optimization
 */

// Get the Payload server URL
export const getPayloadURL = () => {
  return process.env.NEXT_PUBLIC_PAYLOAD_URL || 
         process.env.PAYLOAD_PUBLIC_SERVER_URL || 
         'https://dr-serzhans-psycare.onrender.com';
};

/**
 * Generate optimized image URL using Payload's built-in system
 * @param {Object} media - Media object from Payload
 * @param {string} size - Size variant (thumbnail, small, etc.)
 * @returns {string} - Optimized image URL
 */
export const getImageURL = (media, size = null) => {
  if (!media) return null;
  
  const payloadURL = getPayloadURL();
  
  // If media has filename, use Payload's standard pattern
  if (media.filename) {
    if (size && media.sizes && media.sizes[size] && media.sizes[size].filename) {
      // Use optimized size variant
      return `${payloadURL}/api/media/file/${media.sizes[size].filename}`;
    }
    // Use original image
    return `${payloadURL}/api/media/file/${media.filename}`;
  }
  
  // Handle GridFS URLs if available
  if (media.gridfsUrl) {
    return media.gridfsUrl;
  }
  
  // Handle direct URL strings
  if (typeof media === 'string') {
    // If it's already a full URL, return as is
    if (media.startsWith('http')) {
      return media;
    }
    // If it's a relative path, make it absolute
    return `${payloadURL}/api/media/file/${media}`;
  }
  
  // Handle media object with url property
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${payloadURL}${media.url}`;
  }
  
  return null;
};

/**
 * Generate responsive image srcSet using Payload's size variants
 * @param {Object} media - Media object from Payload
 * @returns {string} - srcSet string for responsive images
 */
export const getImageSrcSet = (media) => {
  if (!media || !media.sizes) return '';
  
  const payloadURL = getPayloadURL();
  const srcSetArray = [];
  
  // Add size variants
  Object.entries(media.sizes).forEach(([sizeName, sizeData]) => {
    if (sizeData.filename && sizeData.width) {
      srcSetArray.push(
        `${payloadURL}/api/media/file/${sizeData.filename} ${sizeData.width}w`
      );
    }
  });
  
  // Add original image
  if (media.filename && media.width) {
    srcSetArray.push(
      `${payloadURL}/api/media/file/${media.filename} ${media.width}w`
    );
  }
  
  return srcSetArray.join(', ');
};

/**
 * Get optimized image dimensions
 * @param {Object} media - Media object from Payload
 * @param {string} size - Size variant
 * @returns {Object} - {width, height} dimensions
 */
export const getImageDimensions = (media, size = null) => {
  if (!media) return { width: null, height: null };
  
  if (size && media.sizes && media.sizes[size]) {
    return {
      width: media.sizes[size].width,
      height: media.sizes[size].height
    };
  }
  
  return {
    width: media.width,
    height: media.height
  };
};

// Note: For React hooks, import them in your component and use the helper functions above