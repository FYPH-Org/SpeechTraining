import React, { Component } from 'react';

const Table = (props) => {
  console.log('table props: ', props.errors);
  return (
    <div>
      <table className="table">
        <tbody>
          {props.errors.map((element) => {
            return (
              <tr>
                <td>{element.bad}</td>
                <td>-></td>
                <td>
                  { element.better.map((suggestion) => {
                    console.log('suggestion inside map: ', suggestion);
                    return (
                      <span>{suggestion} <br /></span>
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};

export default Table;
//
// <tr>
//   <td>John</td>
//   <td>Doe</td>
//   <td>john@example.com</td>
// </tr>
