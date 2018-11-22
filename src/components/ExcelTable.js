import React from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../actions';
import { HotTable } from '@handsontable/react';
import { fields } from '../domain.js'
import config from '../config.js'
import theme from '../theme.js'
import styled from 'styled-components';


const Wrapper = styled.div`
  color: black;
`

class ExcelTable extends React.Component {
  constructor(props) {
    super(props);

    const colHeaders = fields.map(n => n.label);
    const columns = fields.map(n => n.settings);
    this.state = {
      settings: {
        colHeaders,
        columns,
        rowHeights: 30,
        minRows: config.minRows,
        maxRows: config.maxRows,
        colWidths: theme.width / colHeaders.length,
        columnSorting: true,
      },
    };

    this.hotTableComponent = React.createRef();
  }

  componentDidMount() {
    this.hotTableComponent.current.hotInstance.selectCell(0,0);
  }

  onBeforeHotChange = (changes) => {
    const newData = this.props.data.slice(0);

    for (let [row, column, oldValue, newValue] of changes) { // eslint-disable-line
      if (!newData[row]){
        newData[row] = [];
      }
      newData[row][column] = newValue;
    }

    this.props.dispatch(setProducts(newData));

    return false;
  }

  render() {
    const { settings } = this.state;
    const { data } = this.props;

    return (
      <Wrapper>
        <HotTable
          root="hot"
          ref={this.hotTableComponent}
          beforeChange={this.onBeforeHotChange}
          data={data}
          settings={{
            ...settings,
          }}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.main.products,
})

export default connect(mapStateToProps)(ExcelTable);
