import React from 'react';
import './Table.css';

const Table = props => {
  return (
    <div className='container'>
      <div className="text-left">
        <h1 className='changes'> Suggested Changes </h1>
      </div>
      <table className="table table-bordered table-hover">
        <tbody>
          {props.errors.map((element, key) => {
            return (
              <tr key={key}>
                <td className='text-danger' key={key + 1}>
                  {element.bad}
                </td>
                <td className='center-table' key={key + 2}><i className="fa fa-arrow-right" aria-hidden="true" key={key}></i></td>
                <td key={key + 3}>
                  {element.better.map((suggestion, nKey) => {
                    return (
                      <span className='text-success' key={nKey}>
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
