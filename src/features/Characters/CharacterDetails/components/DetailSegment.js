import React from 'react';

const DetailSegment = ({label, detail:{available}}) => (
    <div>
      <label>{label}</label>
      {available}
    </div>)

export default DetailSegment