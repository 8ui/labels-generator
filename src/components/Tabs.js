import React from 'react';
import { connect } from 'react-redux'
import { steps } from '../domain'
import styled from 'styled-components';


const Wrapper = styled.div`
  width: 1090px;
  display: flex;
  align-items: center;
`
const Item = styled.div`
  flex: 1;
  padding: 15px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  cursor: default;
  transition: opacity 0.4s ease;
  opacity: ${props => props.active
    ? 1
    : 0.5
  }
`
const ItemNumber = styled.span`
  font-size: 50px;
  opacity: 0.5;
  margin-right: 6px;
`
const ItemText = styled.span`
  font-size: 18px;
`

class Buttons extends React.Component {
  renderItem = (item, index) => (
    <Item active={this.props.step === index} key={`tab-${index}`}>
      <ItemNumber>{index + 1}</ItemNumber>
      <ItemText>{item}</ItemText>
    </Item>
  )

  render() {
    return (
      <Wrapper>
        {steps.map(this.renderItem)}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  step: state.main.step,
})

export default connect(mapStateToProps)(Buttons)
