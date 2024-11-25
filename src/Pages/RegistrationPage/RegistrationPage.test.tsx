import { render, screen } from '@testing-library/react';
import RegistrationPage from './RegistrationPage';

test('Renders Registration Page', () => {
    render(<RegistrationPage />);
    const linkElement = screen.getByText(/Reg Page/i);
    expect(linkElement).toBeInTheDocument();
});
