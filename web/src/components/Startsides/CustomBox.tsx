import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BoxProps {
  title: string;
  description: string;
  path?: string;
}

interface BoxState {
  isHovered: boolean;
}

const boxStyle: CSSProperties = {
  width: "300px",
  height: "300px",
  backgroundColor: "white",
  borderRadius: "10px",
  border: "1px solid black",
  boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "5px", // Distance between the boxes
  transition: "background-color 0.3s", // Smooth transition for background color change
  cursor: "pointer", // Cursor change on hover
};

const hoverStyle: CSSProperties = {
  backgroundColor: "gray", // Background color change on hover
};

const titleStyle: CSSProperties = {
  fontWeight: "bold", // Make the title bold
};

const CustomBox = ({ title, description, path}: BoxProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true)
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

    const boxClassName = isHovered ? "box-hover" : "";

    const navigate = useNavigate();

    return (
      <div
        style={{ ...boxStyle, ...(isHovered ? hoverStyle : {}) }}
        onClick={() => navigate(path ?? "")}
        className={boxClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h3 style={titleStyle}>{title}</h3>
        <p style={{ textAlign: "center" }}>{description}</p>
      </div>
    );
  
}

export default CustomBox;
