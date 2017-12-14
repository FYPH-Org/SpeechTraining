import React from 'react';
import './Table.css';

const Table = props => {
  return (
    <div className='container'>
      <h1> Suggested Changes </h1>
      <table className="table table-bordered table-hover">
        <tbody>
          {props.errors.map(element => {
            return (
              <tr>
                <td className='text-danger'>
                  {element.bad}
                </td>
                <td className='center-table'><i className="fa fa-arrow-right" aria-hidden="true"></i></td>
                <td>
                  {element.better.map(suggestion => {
                    return (
                      <span className='text-success'>
                        {suggestion} <br />
                      </span>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
