import React from 'react';
import { connect } from 'react-redux'
import { changeStep } from '../actions';
import { getStep, getLoading } from '../selectors';
import theme from '../theme';
import styled from 'styled-components';

import Tabs from '../components/Tabs.js';
import Buttons from '../components/Buttons.js';
import Loading from '../components/Loading.js';

// Steps
import ExcelTable from '../components/ExcelTable.js';
import Labels from '../components/Labels.js';
import Finish from '../components/Finish.js';


const Wrapper = styled.div`
  padding:
    ${theme.paddingTop}px
    ${theme.paddingHorizontal}px
    ${theme.paddingBottom}px
    ${theme.paddingHorizontal}px
  ;
  display: flex;
  flex-direction: column;
  align-items: center;
  *, :after, :before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}
`

class Steps extends React.Component {
  onForward = (e) => {
    e.preventDefault();

    this.props.dispatch(changeStep(this.props.step + 1));
  }

  onBack = (e) => {
    e.preventDefault();

    this.props.dispatch(changeStep(this.props.step - 1));
  }

  renderTabs = () => (
    <Tabs />
  )

  renderExcel = () => (
    <ExcelTable />
  )

  renderLabels = () => (
    <Labels />
  )

  renderFinish = () => (
    <Finish />
  )

  renderStep = () => {
    const { step, loading } = this.props

    if (loading) {
      return <Loading />
    }

    switch (step) {
      case 0:
        return this.renderExcel()
      case 1:
        return this.renderLabels()
      case 2:
        return this.renderFinish()
      default:
        return null;
    }
  }

  renderButtons = () => (
    <Buttons
      onBack={this.onBack}
      onForward={this.onForward}
    />
  )

  render() {
    return (
      <Wrapper>
        <h1>Генератор ценников</h1>
        {this.renderTabs()}
        <div id="cs-gen-steps">{this.renderStep()}</div>
        {this.renderButtons()}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  step: getStep(state),
  loading: getLoading(state),
})

export default connect(mapStateToProps)(Steps);
