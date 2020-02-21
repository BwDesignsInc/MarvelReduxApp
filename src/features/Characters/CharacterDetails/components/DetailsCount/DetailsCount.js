import React from 'react';

export const DetailsCount = ({label, detail:{available}}) => (
    <div>
      <label>{label}</label>
      {available}
    </div>)

export default DetailsCount;