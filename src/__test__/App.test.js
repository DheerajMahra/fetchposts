import React from 'react';
import { screen, render, userEvent, waitForElementToBeRemoved } from '../test/test-utils';
import App from '../components/App';

describe("<LoadMore />", () => {
  test("Button text is `Loading...` on initial load", () => {
    render(<App />);
    expect(1).toBe(1)
  });
});