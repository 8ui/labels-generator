import React from 'react';
import { connect } from 'react-redux';
import { getCalcProducts, getStep, getLabel, getLoading } from '../selectors';
import { labels } from '../domain';
import { pluralForm } from '../utils';
import theme from '../theme';
import styled from 'styled-components';

import Button from './Button.js';


const wrapperHeight = 61;

const Wrapper = styled.div`
  position: ${props => props.active ? 'fixed' : 'static'};
  bottom: 0px;
  left: 0;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  color: black;
`
const Container = styled.div`
  width: ${theme.width}px;
  background: white;
  padding: 10px;
  display: flex;
  border-top: 1px solid #CCC;
  justify-content: space-between;
  button {
    margin-left: 20px;
  }
`
const Helper = styled.div`
  color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  img {
    box-shadow: 0 1px 1px rgba(0,0,0,.3);
    margin: 0 25px 0 15px;
  }
`;

class Buttons extends React.Component {
  state = {
    active: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.step !== this.props.step || nextProps.loading !== this.props.loading) {
      setTimeout(() => {
        var d = document.getElementById("cs-gen-steps");

        var offsetHeight = d.offsetHeight;

        this.setState({
          offsetHeight,
        }, this.handleScroll);
      });

      const top = document.getElementById("cs-gen-root").offsetTop;
      window.scrollTo(0, top);
    }
  }

  componentDidMount() {
    var d = document.getElementById("cs-gen-steps");

    var offsetTop = d.offsetTop;
    var offsetHeight = d.offsetHeight;
    this.setState({
      offsetTop,
      offsetHeight,
    })

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { offsetTop, offsetHeight } = this.state;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    let active = false;

    if (scrollTop + windowHeight - 200 >= offsetTop && scrollTop <= offsetTop + offsetHeight - windowHeight + wrapperHeight) {
      active = true;
    }

    if (active !== this.state.active) {
      this.setState({active})
    }
  }

  renderHelper = () => {
    const { products, label: id } = this.props;
    const label = (labels.find(n => n._id === id) || {});
    const count = products.length;

    return (
      <Helper>
        {!!count &&
          <React.Fragment>
            <img alt={label.name} src={`${label.preview}?s=30`} />
            Будет {pluralForm(count, 'создан', 'создано', 'создано')} {count} {pluralForm(count, 'ценник', 'ценника', 'ценников')}
          </React.Fragment>
        }
      </Helper>
    )
  }

  render() {
    const { onForward, onBack, step, loading } = this.props;
    const { active } = this.state;

    if (step === 2) {
      return null;
    }

    return (
      <div style={{minHeight: wrapperHeight}}>
        <Wrapper active={active}>
          <Container>
            {this.renderHelper()}
            <div>
              {step > 0 && <Button onClick={onBack}>Назад</Button>}
              {step < 2 &&
                <Button disabled={loading} color="green" onClick={onForward}>
                  Далее
                </Button>
              }
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: getStep(state),
  label: getLabel(state),
  loading: getLoading(state),
  products: getCalcProducts(state),
})

export default connect(mapStateToProps)(Buttons)
