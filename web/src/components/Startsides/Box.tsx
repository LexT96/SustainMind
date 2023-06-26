import React, { ReactNode } from 'react';

interface BoxProps {
  children?: ReactNode;
  size: number;
}

class Box extends React.Component<BoxProps> {
  render() {
    const { children, size } = this.props;

    const boxStyle = {
      backgroundColor: 'blue',
      width: size,
      height: size,
      padding: '10px',
    };

    return (
      <div style={boxStyle}>
        {children}
      </div>
    );
  }
}

export default Box;
