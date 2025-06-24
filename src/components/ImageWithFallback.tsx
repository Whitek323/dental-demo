import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  srcBase: string;  // เช่น 'theme/kid/banner'
  alt: string;
  width?: number;
  className?: string;
  navLink?:string;
};

const ImageWithFallback: React.FC<Props> = ({ srcBase, alt, width, className,navLink }) => {
  const [src, setSrc] = useState(`${srcBase}.jpg`);
  const navigate = useNavigate();
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      onClick={()=> navigate(navLink)}
      className={className}
      onError={() => setSrc(`${srcBase}.png`)}
      style={{cursor:"pointer"}}
    />
  );
};

export default ImageWithFallback;
