import React from 'react';
import { Col, ControlLabel } from 'react-bootstrap';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

function _renderActualComponent(props) {
  const {
    data,
    disabled,
    multiple,
    striped,
    height,
    displayHeader
  } = props;

  const config = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    displayHeader: displayHeader || true,
    selectable: !disabled,
    multiSelectable: !disabled && multiple,
    enableSelectAll: !disabled && multiple,
    deselectOnClickaway: !disabled && !multiple,
    showCheckboxes: !disabled,
    striped: striped || true,
    height: height || '100px'
  };

  return (
    <div>
      <Table
        height={config.height}
        fixedHeader={config.fixedHeader}
        fixedFooter={config.fixedFooter}
        selectable={config.selectable}
        multiSelectable={config.multiSelectable}>
        <TableHeader
          headerStyle={config.displayHeader ? 'display: visible' : 'display: none'}
          displaySelectAll={config.showCheckboxes}
          adjustForCheckbox={config.showCheckboxes}
          enableSelectAll={config.enableSelectAll}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={config.showCheckboxes}
          deselectOnClickaway={config.deselectOnClickaway}
          showRowHover={config.showRowHover}
          stripedRows={data.length > 2 && config.striped}>
          {data.map((row, index) => (
            <TableRow key={index} selected={row.selected}>
              <TableRowColumn>{index}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const SFieldTable = (props) => {
  return (
    <div >
      <Col componentClass={ControlLabel} className='default-label-table' sm={2}>
        {props.label}
      </Col>
      <Col sm={props.size || 3} className={props.disabled ? 'form-control-static' : ''}>
        {_renderActualComponent(props)}
      </Col>
    </div >
  );
}

export default SFieldTable;
