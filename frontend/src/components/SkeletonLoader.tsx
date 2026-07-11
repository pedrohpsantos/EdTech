import React from 'react';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  style
}) => {
  return (
    <>
      <style>{`
        @keyframes skeleton-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .skeleton-loader-animated {
          background-color: #e9ecef;
          animation: skeleton-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <div 
        className={`skeleton-loader-animated ${className}`}
        style={{
          width,
          height,
          borderRadius,
          ...style
        }}
      />
    </>
  );
};

export default SkeletonLoader;
