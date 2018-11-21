import React from 'react';
import { connect } from 'react-redux';
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
`
const Container = styled.div`
  width: 1090px;
  background: white;
  padding: 10px;
  display: flex;
  border-top: 1px solid #CCC;
  justify-content: space-between;
  a {
    margin-left: 20px;
  }
`

class Buttons extends React.Component {
  state = {
    active: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.step !== this.props.step) {
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

  render() {
    const { onForward, onBack, step } = this.props;
    const { active } = this.state;
    return (
      <div style={{minHeight: wrapperHeight}}>
        <Wrapper active={active}>
          <Container>
            <div></div>
            <div>
              {step > 0 && <Button onClick={onBack}>Назад</Button>}
              <Button color="green" onClick={onForward}>
                Далее
              </Button>
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.main.step,
})

export default connect(mapStateToProps)(Buttons)
