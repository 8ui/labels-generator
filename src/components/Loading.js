import React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: white;
  width: ${theme.width}px;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 600px;
  color: black;
`

class Loading extends React.Component {
  render() {
    return (
      <Wrapper>
        <h1>Загрузка</h1>
      </Wrapper>
    )
  }
}

export default Loading;
