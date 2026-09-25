import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'square' | 'wide';
  className?: string;
  isHovered?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  aspectRatio = 'portrait',
  className = '',
  isHovered = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const ratioClass = {
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    wide: 'aspect-[4/3]',
  }[aspectRatio];

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#F7F7F5] select-none ${ratioClass} ${className}`}
    >
      {/* Loading Skeleton Shimmer */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#E8E8E5]/50 animate-pulse" />
      )}

      {/* Main Fashion Image with smooth transform */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-105' : 'scale-100'}`}
      />
    </div>
  );
};
