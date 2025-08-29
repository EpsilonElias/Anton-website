import React from 'react';

const SimpleHtmlContent = ({ htmlContent }) => {
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
