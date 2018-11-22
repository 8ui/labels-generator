import React from 'react';
import styled from 'styled-components';


const Background = props => {
  if (props.inverted) {
    return 'transparent';
  }
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
  if (props.inverted) {
    return 'transparent';
  }
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
      return props.inverted ? 'white' : 'rgba(34,36,38,.15)';
    case 'green':
      return '#2baf4a';
    default:
      return 'transparent';
  }
}

const BorderColorHover = props => {
  switch (props.color) {
    case 'white':
      return props.inverted ? 'white' : 'rgba(34,36,38,.35)';
    case 'green':
      return '#25943f';
    default:
      return 'transparent';
  }
}

const Color = props => {
  switch (props.color) {
    case 'white':
      return props.inverted ? 'white' : 'rgba(0,0,0,.6)';
    case 'green':
      return 'white';
    default:
      return 'transparent';
  }
}

const Wrapper = styled.button`
  display: inline-flex;
  padding: 10px 25px;
  border-radius: 3px;
  background: ${Background};
  color: ${Color};
  font-size: 16px;
  text-align: center;
  border: 1px ${props => props.inverted ? 'dashed' : 'solid'} ${BorderColor};
  outline: none;
  opacity: ${props => props.disabled ? 0.4 : 1}
  cursor: ${props => props.disabled ? 'default' : 'pointer'}

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
