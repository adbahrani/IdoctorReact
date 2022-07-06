import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login react", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", {
    name: /log in/i
  });
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", {
    name: /log in/i
  });
  linkElement.click();
  const linkElement2 = screen.getByRole("heading", {
    name: /log in/i
  });
  expect(linkElement2).toBeInTheDocument();

  let email = screen.getByRole("input", {
    name: /email/i
  });

  expect(email).toBeInTheDocument();
});
