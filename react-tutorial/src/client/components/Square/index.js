import React from 'react';

const Square = ({ value, onClick, dataSet }) => (
  <button className="square" onClick={onClick} data-position={dataSet}>
    {value}
  </button>
);

export default Square;
