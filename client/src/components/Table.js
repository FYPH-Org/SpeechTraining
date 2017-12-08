import React from 'react';

const Table = props => {
  return (
    <div>
      <table className="table">
        <tbody>
          {props.errors.map(element => {
            return (
              <tr>
                <td>
                  {element.bad}
                </td>
                <td>-></td>
                <td>
                  {element.better.map(suggestion => {
                    return (
                      <span>
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
