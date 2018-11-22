import React from 'react';
import { connect } from 'react-redux';
import { changeLabel } from '../actions';
import { labels } from '../domain';
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
`
const Item = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #FFF;
  padding: 0;
  cursor: pointer;
  border: none;
  margin: 10px;
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(-10px);
  }
`
const ItemImage = styled.div`
  display: flex;
  align-items: center!important;
  justify-content: center!important;
  height: 228px!important;
  img {
    border-top: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 2px 2px rgba(0,0,0,.3);
    width: auto!important;
    max-height: 100%!important;
    max-width: 100%!important;
    height: auto!important;
  }
`
const ItemContent = styled.div`
  flex-grow: 1;
  padding: 18px 0;
  font-size: 14px;
  color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    background: ${props => props.active ? 'rgba(1, 87, 155, 0.4)' : 'transparent'};
    margin: 0;
    padding: 3px 12px;
    border-radius: 10px;
  }
`

class Component extends React.Component {
  onChange = (label) => {
    this.props.dispatch(changeLabel(label));
  }

  renderLabel = label => {
    return (
      <Item key={label._id} onClick={() => this.onChange(label._id)}>
        <ItemContent active={this.props.label === label._id}>
          <h4>{label.name}</h4>
        </ItemContent>
        <ItemImage>
          <img alt={label.name} src={label.preview} />
        </ItemImage>
      </Item>
    )
  }

  render() {
    return (
      <Wrapper>
        {labels.map(this.renderLabel)}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  label: state.main.label,
})

export default connect(mapStateToProps)(Component)
