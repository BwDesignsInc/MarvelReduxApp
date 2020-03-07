import React from "react";
import { render } from "@testing-library/react";
import DetailsCount from "./DetailsCount";
const mockProps = {
  label: "Comics",
  detail: {
    available: "39"
  }
};
test("renders Detail Count of Charater", () => {
  const { getByTestId, getByText, debug, container } = render(
    <DetailsCount {...mockProps} />
  );
  const details = getByTestId(/details-count/i);
  const label = getByText(mockProps.label);
  const detail = getByText(mockProps.detail.available);
  expect(details).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(detail).toBeInTheDocument();
  debug(container);
});
