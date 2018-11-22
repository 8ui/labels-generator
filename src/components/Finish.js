import React from 'react';
import { connect } from 'react-redux';
import { changeEmail, changeStep, setProducts } from '../actions';
import { getBuildedData } from '../selectors';
import theme from '../theme';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon.js';
import Button from './Button.js';

const out = keyframes`
  100% {
    transform: translate(0, 0);
    height: 250px;
  }
`
const labeltop = keyframes`
  100% {
    transform: scale(1.25, 1);
    z-index: 0;
  }
`
const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const finish = keyframes`
  100% {
    opacity: 100;
  }
`

const Wrapper = styled.div`
  width: ${theme.width}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  min-height: 600px;
  color: black;
  position: relative;
  overflow: hidden;
`
const Header = styled.h1`
  margin: 10px 0 40px;
`
const Form = styled.form`
  width: 550px;
  margin-bottom: 500px;
  padding: 20px 30px 0px 30px;
  height: 420px;
  background: #fff;
  transition: all 0.5s ease;
  text-align: center;
  position: absolute;
  z-index: -5;
  margin-left: 25px;
  transform: translate(0px, -250px);

  &.completed {
    animation: ${out} 0.4s ease forwards;
  }

  > div {
    display: flex;
    > button {
      display: flex;
      align-items: center;
      font-size: 3rem;
      border-radius: 0.4rem;
      box-shadow: 0.1rem 0.8rem 1.6rem rgba(0,0,0,0.3);
    }
  }
`
const Input = styled.div`
  display: flex;
  margin: 0 25px 0 0;

  input {
    flex: 1;
    display: block;
    margin: 0;
    padding: 0.8rem 1.6rem;
    color: black;
    width: 100%;
    font-family: inherit;
    font-size: 2.1rem;
    font-weight: inherit;
    line-height: 1.8;
    border: none;
    border-radius: 0.4rem;
    transition: box-shadow 300ms;
    box-shadow: 0.1rem 0.8rem 1.6rem rgba(0,0,0,0.3);
    &::placeholder {
      color: #B0BEC5;
    }
    &:focus {
      outline: none;
    }
  }
`
const Spinner = styled(Icon)`
  animation: ${spinner} 1.6s linear infinite;
`
const Envelope = styled.div`
  margin: 200px auto 20px;
  background: #c2c9d5;
  width: 600px;
  perspective: 3000px;
  perspective-origin: 50% 0;
`
const Top = styled.div`
  display: block;
  width: 0;
  height: 0;
  border: 240px solid transparent;
  border-top-color: #d1d7df;
  transition: all 0.5s ease;
  transform-origin: 50% 0;
  margin: 0 auto;
  margin-bottom: -480px;
  position: relative;

  transform: rotateX(-180deg) scale(1.25,1);
  z-index: -20;

  &.completed {
    animation: ${labeltop} 0.4s ease forwards;
    animation-delay: 0.4s;
  }
`
const Rest = styled.div`
  height: 0;
  margin: 0 auto;
  border: 250px solid #EFF1F4;
  border-bottom: 150px solid #e0e4ea;
  border-top: 150px solid transparent;
  margin-top: -300px;
`
const FinishText = styled.div`
  margin: 100px 0 -100px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2em;
  color: white;
  opacity: 0;
  animation: ${finish} 0.4s ease forwards;
  animation-delay: 0.8s;
  > div {
    text-align: center;
    padding-bottom: 20px;
    button {
      margin: 0 0 0 15px;
    }
  }
`

class Component extends React.Component {
  state = {
    loading: false,
    error: false,
    completed: false,
  }

  componentDidMount() {
    try {
      this.input.focus();
    } catch (e) {
      console.warn(e);
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { data: { data, email } } = this.props;

    this.setState({loading: true});

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('email', email);

      // const result = await new Promise(resolve => {
      //   setTimeout(resolve, 2000);
      // });

      const result = await fetch('https://doc-server.cloudshop.ru/send/labels', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      this.setState({loading: false, completed: true});

      return result;
    } catch (e) {
      this.setState({error: true, loading: false})
    }
  }

  onChange = (e) => {
    const { dispatch } = this.props;

    dispatch(changeEmail(e.target.value));
  }

  onRestart = () => {
    this.props.dispatch(setProducts([[]]));
    this.props.dispatch(changeStep(0));
  }

  renderFinishText = () => {
    const { data: { email } } = this.props;
    const { completed } = this.state;

    if (completed) {
      return (
        <FinishText>
          <div>Письмо с ценниками отправлено<br /> на <span>{email}</span></div>
          <div>
            <Button inverted color="white" onClick={this.onRestart}>Сделать еще</Button>
          </div>
        </FinishText>
      )
    }
    return null;
  }

  renderForm = () => {
    const { data: { email } } = this.props;
    const { loading, completed } = this.state;
    return (
      <Form onSubmit={this.onSubmit} className={completed ? 'completed' : ''}>
        <Header>Укажите email для отправки ценников</Header>
        <div>
          <Input>
            <input
              ref={e => { this.input = e; }}
              placeholder="example@mail.com"
              onChange={this.onChange}
              value={email}
              type="email"
            />
          </Input>
          <Button disabled={loading} color="green">
            {loading
              ? <Spinner name="spinner" />
              : <Icon name="arrow-alt-circle-right" />
            }
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const { completed } = this.state;
    return (
      <Wrapper>
        {this.renderFinishText()}
        <Envelope>
          <Top className={completed ? 'completed' : ''} />
          {this.renderForm()}
          <Rest />
        </Envelope>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: getBuildedData(state),
})

export default connect(mapStateToProps)(Component)
