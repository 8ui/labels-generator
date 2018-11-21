import React from 'react';
import styled from 'styled-components';


const Background = props => {
  switch (props.color) {
    case 'white':
      return 'white';
    case 'green':
      return '#2baf4a';
    default:
      return 'transparent';
  }
}

const BackgroundHover = props => {
  switch (props.color) {
    case 'white':
      return 'white';
    case 'green':
      return '#25943f';
    default:
      return 'transparent';
  }
}

const BorderColor = props => {
  switch (props.color) {
    case 'white':
      return 'rgba(34,36,38,.15)';
    case 'green':
      return '#2baf4a';
    default:
      return 'transparent';
  }
}

const BorderColorHover = props => {
  switch (props.color) {
    case 'white':
      return 'rgba(34,36,38,.35)';
    case 'green':
      return '#25943f';
    default:
      return 'transparent';
  }
}

const Color = props => {
  switch (props.color) {
    case 'white':
      return 'rgba(0,0,0,.6)';
    case 'green':
      return 'white';
    default:
      return 'transparent';
  }
}

const Wrapper = styled.a`
  display: inline-flex;
  padding: 10px 25px;
  border-radius: 3px;
  background: ${Background};
  color: ${Color};
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  border: 1px solid ${BorderColor};

  &:hover {
    background: ${BackgroundHover};
    border-color: ${BorderColorHover};
  }
`

class Button extends React.Component {
  render() {
    return (
      <Wrapper {...this.props} />
    );
  }
}

Button.defaultProps = {
  color: 'white',
}

export default Button
