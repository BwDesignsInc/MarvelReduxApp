import React from "react";

export const DetailsCount = ({ label, detail: { available }, onClick }) => (
  <div data-testid="details-count" onClick={onClick}>
    <label>{label}</label>
    <span>{available}</span>
  </div>
);

export default DetailsCount;
