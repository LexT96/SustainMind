import React, { CSSProperties } from 'react';

interface BoxProps {
  title: string;
  description: string;
}

interface BoxState {
  isHovered: boolean;
}

class CustomBox extends React.Component<BoxProps, BoxState> {
  constructor(props: BoxProps) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({
      isHovered: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };

  render() {
    const { title, description } = this.props;
    const { isHovered } = this.state;

    const boxStyle: CSSProperties = {
      width: '300px',
      height: '300px',
      backgroundColor: 'white',
      borderRadius: '10px',
      border: '1px solid black',
      boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px', // Distance between the boxes
      transition: 'background-color 0.3s', // Smooth transition for background color change
      cursor: 'pointer', // Cursor change on hover
    };

    const hoverStyle: CSSProperties = {
      backgroundColor: 'gray', // Background color change on hover
    };

    const boxClassName = isHovered ? 'box-hover' : '';

    const titleStyle: CSSProperties = {
      fontWeight: 'bold', // Make the title bold
    };

    return (
      <div
        style={{ ...boxStyle, ...(isHovered ? hoverStyle : {}) }}
        className={boxClassName}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <h3 style={titleStyle}>{title}</h3>
        <p style={{ textAlign: 'center' }}>{description}</p>
      </div>
    );
  }
}

export default CustomBox;
