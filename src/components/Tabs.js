import React from 'react';
import { connect } from 'react-redux'
import { steps } from '../domain'
import { changeStep } from '../actions';
import { getStep, getLoading } from '../selectors';
import theme from '../theme';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon';


const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  width: ${theme.width}px;
  display: flex;
  align-items: center;
`
const Spinner = styled(Icon)`
  animation: ${spinner} 1.6s linear infinite;
  width: 30px;
  margin: 0 6px 10px 0;
`
const Item = styled.a`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 15px;
  color: #fff;
  font-weight: 600;
  height: 89px;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.4s ease;
  opacity: ${props => props.active
    ? 1
    : 0.3
  };
  &:hover {
    opacity: 1;
  }
`
const ItemNumber = styled.span`
  font-size: 50px;
  opacity: 0.5;
  margin-right: 6px;
  width: 30px;
`
const ItemText = styled.span`
  font-size: 18px;
  margin: 0 0 7px;
`

class Buttons extends React.Component {
  onClick = (step) => {
    this.props.dispatch(changeStep(step))
  }

  renderItem = (item, index) => (
    <Item
      onClick={() => this.onClick(index)}
      active={this.props.step === index} key={`tab-${index}`}
    >
      {this.props.loading && this.props.step === index
        ? <Spinner name="spinner" />
        : <ItemNumber>{index + 1}</ItemNumber>
      }
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
  step: getStep(state),
  loading: getLoading(state),
})

export default connect(mapStateToProps)(Buttons)
