import { render, screen } from '@testing-library/react';
import Homepage from '../src/App/Homepage'

test('renders learn react link', () => {
  render(<Homepage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
