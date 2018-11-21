import React from 'react';
import { connect } from 'react-redux'
import { changeStep } from '../actions';
import theme from '../theme';
import styled from 'styled-components';

import Tabs from '../components/Tabs.js';
import Buttons from '../components/Buttons.js';

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
    switch (this.props.step) {
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
  step: state.main.step,
})

export default connect(mapStateToProps)(Steps);
