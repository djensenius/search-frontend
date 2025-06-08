import { render, screen } from '@testing-library/react';
import { DachshundLogo } from '../DachshundLogo';

describe('DachshundLogo', () => {
  it('renders the logo with default size', () => {
    render(<DachshundLogo />);
    const logo = screen.getByAltText('Dachshund dog mascot');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('width', '48');
    expect(logo).toHaveAttribute('height', '48');
  });

  it('renders the logo with custom size', () => {
    render(<DachshundLogo size={64} />);
    const logo = screen.getByAltText('Dachshund dog mascot');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '64');
  });

  it('applies custom className', () => {
    render(<DachshundLogo className="custom-class" />);
    const logoContainer = screen.getByAltText('Dachshund dog mascot').parentElement;
    expect(logoContainer).toHaveClass('custom-class');
  });
});