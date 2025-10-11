import React from "react";


const ResponsiveImage = ({
  baseName, // nome base do arquivo, sem extensão
  alt = "",
  width,
  height,
  className = "",
  style = {},
}) => {
  const webp150 = `/src/assets/${baseName}-150.webp`;
  const webp300 = `/src/assets/${baseName}-300.webp`;
  const webp600 = `/src/assets/${baseName}-600.webp`;

  const png150 = `/src/assets/${baseName}-150.png`;
  const png300 = `/src/assets/${baseName}-300.png`;
  const png600 = `/src/assets/${baseName}-600.png`;

  return (
    <picture>
      {/* Formato moderno */}
      <source
        srcSet={`${webp150} 150w, ${webp300} 300w, ${webp600} 600w`}
        type="image/webp"
      />

      {/* Fallback */}
      <img
        src={png300}
        srcSet={`${png150} 150w, ${png300} 300w, ${png600} 600w`}
        sizes="(max-width: 600px) 150px, (max-width: 1200px) 300px, 600px"
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={className}
        style={{ objectFit: "cover", ...style }}
      />
    </picture>
  );
};

export default ResponsiveImage;
