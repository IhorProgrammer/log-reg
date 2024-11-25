import { render, screen } from '@testing-library/react';
import AuthenticationPage from './AuthenticationPage';

test('Renders Registration Page', () => {
    render(<AuthenticationPage />);
    const linkElement = screen.getByText(/Authentication Page/i);
    expect(linkElement).toBeInTheDocument();
});
