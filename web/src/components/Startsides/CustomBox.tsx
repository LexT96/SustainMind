import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BoxProps {
  title: string;
  description: string;
  path?: string;
  backgroundImage: string;
}

interface BoxState {
  isHovered: boolean;
}

const boxStyle: CSSProperties = {
  width: "300px",
  height: "300px",
  borderRadius: "10px",
  border: "2px solid #bababa",
  padding: "10px",
  boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "5px", // Distance between the boxes
  transition: "box-shadow 0.3s", // Transition for box shadow change
  cursor: "pointer", // Cursor change on hover
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center", // Center the background image vertically and horizontally
};

const hoverStyle: CSSProperties = {
  boxShadow: "0px 4px 8px 2px rgba(0, 0, 0, 0.5)", // Additional box shadow on hover
};

const titleStyle: CSSProperties = {
  fontWeight: "bold", // Make the title bold
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Add text shadow for better readability
};

const descriptionStyle: CSSProperties = {
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Add text shadow for better readability
};

const CustomBox = ({ title, description, path, backgroundImage }: BoxProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const boxClassName = isHovered ? "box-hover" : "";

  const navigate = useNavigate();

  return (
    <div
      style={{
        ...boxStyle,
        ...(isHovered ? hoverStyle : {}),
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url("${backgroundImage}")`,
      }}
      onClick={() => navigate(path ?? "")}
      className={boxClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 style={titleStyle}>{title}</h3>
      <p style={{ textAlign: "center", ...descriptionStyle }}>{description}</p>
    </div>
  );
};

export default CustomBox;
