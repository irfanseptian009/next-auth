import { render, screen } from "@testing-library/react";
import Login from "../pages/login";

import { test, expect } from "@jest/globals";

test("renders login form", () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(usernameInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
});
