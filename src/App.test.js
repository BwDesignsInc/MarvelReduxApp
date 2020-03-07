import "@testing-library/jest-dom/extend-expect";

import React from "react";
import App from "App";
import { renderWithRedux } from "utils/test";

test("renders learn react link", async () => {
  const { getByTestId } = renderWithRedux(<App />);
  const linkElement = getByTestId(/marvelApp/i);
  expect(linkElement).toBeInTheDocument();
});
