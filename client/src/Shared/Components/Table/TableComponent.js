import React from "react";
import classes from "./TableComponent.module.css";
import { Button, Col, Dropdown, Row, Spinner, Table } from "react-bootstrap";

const TableComponent = ({
  isLoading,
  columns,
  data,
  actions,
  filters,
  actionHandler,
  primaryKey,
  createButton,
}) => {
  return (
    <>
      <Row className={classes.Filters}>
        {filters && (
          <Col>
            {filters.map((filter, filterIndex) => (
              <React.Fragment key={filterIndex}>
                {filter.type === "text" && (
                  <input
                    {...filter}
                    onChange={(event) => {
                      actionHandler("filterChange", {
                        filterName: filter.name,
                        filterValue: event.target.value,
                      });
                    }}
                  />
                )}
                {filter.type === "select" && (
                  <select
                    onChange={(event) => {
                      actionHandler("filterChange", {
                        filterName: filter.name,
                        filterValue: event.target.value,
                      });
                    }}
                  >
                    {filter.options &&
                      filter.options.map((o, optionIndex) => (
                        <option key={optionIndex} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                  </select>
                )}
              </React.Fragment>
            ))}
          </Col>
        )}
      </Row>
      {isLoading && (
        <Spinner
          className={classes.spinner}
          animation="border"
          variant="secondary"
        />
      )}
      <Table responsive className={classes.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column["label"]}</th>
            ))}
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            {!data.length && ( // if there is no data
              <tr>
                <td
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center" }}
                >
                  No data found
                </td>
              </tr>
            )}
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{row[column.dblabel]}</td>
                ))}
                <td style={{ textAlign: "right" }}>
                  {actions &&
                    actions.map((a, index) => (
                      <Dropdown.Item
                        className={classes.DropdownItem}
                        key={index}
                        style={{ display: "inline" }}
                        onClick={() => {
                          actionHandler(a.action, row[primaryKey]);
                        }}
                      >
                        {a.icon} {a.label}
                      </Dropdown.Item>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default React.memo(TableComponent);
