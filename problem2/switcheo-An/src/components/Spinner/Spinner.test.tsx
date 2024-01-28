import { render } from '@testing-library/react';
import { Spinner, SpinnerProps } from './index';

describe('Spinner Component', () => {
  const defaultProps: SpinnerProps = {
    color: 'info',
    size: 'md',
  };

  it('renders the Spinner component with default props', () => {
    const { getByRole } = render(<Spinner {...defaultProps} />);

    const spinnerComponent = getByRole('status');
    expect(spinnerComponent).toBeInTheDocument();

    const svgElement = getByRole('status').firstChild as SVGElement;
    expect(svgElement).toBeVisible();
    expect(svgElement).toHaveClass('stroke-blue-400');
    expect(svgElement).toHaveClass('h-10');
    expect(svgElement).toHaveClass('w-10');
  });

  it('renders the Spinner component with custom props', () => {
    const customProps: SpinnerProps = {
      color: 'success',
      size: 'sm',
      className: 'custom-class',
    };

    const { getByRole } = render(<Spinner {...customProps} />);

    const spinnerComponent = getByRole('status');
    expect(spinnerComponent).toBeInTheDocument();

    const svgElement = getByRole('status').firstChild as SVGElement;
    expect(svgElement).toBeVisible();
    expect(svgElement).toHaveClass('stroke-green-400');
    expect(svgElement).toHaveClass('h-5');
    expect(svgElement).toHaveClass('w-5');
    expect(svgElement).toHaveClass('animate-spin');
    expect(spinnerComponent.firstChild).toHaveClass('custom-class');
  });

  it('should have `role="status"` by default', () => {
    const { getByRole } = render(<Spinner aria-label="My spinner" />);
    const spinnerComponent = getByRole('status');

    expect(spinnerComponent).toHaveAccessibleName('My spinner');
  });

  it('should be able to set no `role`', () => {
    const { getByLabelText } = render(
      <Spinner aria-label="My spinner" role={undefined} />
    );

    const spinner = getByLabelText('My spinner');

    expect(spinner).not.toHaveAttribute('role');
  });
});
