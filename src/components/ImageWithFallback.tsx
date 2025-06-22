import React, { useState } from 'react';

type Props = {
  srcBase: string;  // เช่น 'theme/kid/banner'
  alt: string;
  width?: number;
  className?: string;
};

const ImageWithFallback: React.FC<Props> = ({ srcBase, alt, width, className }) => {
  const [src, setSrc] = useState(`${srcBase}.jpg`);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      className={className}
      onError={() => setSrc(`${srcBase}.png`)}
    />
  );
};

export default ImageWithFallback;
