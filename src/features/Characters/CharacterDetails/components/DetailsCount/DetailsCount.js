import React from "react";

export const DetailsCount = ({ label, detail: { available } }) => (
  <div data-testid="details-count">
    <label>{label}</label>
    <span>{available}</span>
  </div>
);

export default DetailsCount;
