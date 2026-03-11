import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    it('renders the initial layout correctly', () => {
        render(<App />);
        expect(screen.getByText(/Stylized Terminal Exporter/i)).toBeInTheDocument();
        expect(screen.getByText(/Terminal Inputs/i)).toBeInTheDocument();
        expect(screen.getByText(/Themes/i)).toBeInTheDocument();
    });

    it('allows adding a new command line', () => {
        render(<App />);
        const addCommandBtn = screen.getByText(/Add Command/i);
        fireEvent.click(addCommandBtn);

        // Initial state has 2 lines, after adding 1 it should have 3
        const lines = screen.getAllByText(/Line \d/i);
        expect(lines.length).toBe(3);
    });

    it('inherits PS1 from the last command when adding a new one', () => {
        render(<App />);

        // Get the first command line and change its PS1
        const ps1Input = screen.getByDisplayValue('user@host:~$');
        fireEvent.change(ps1Input, { target: { value: 'custom@ps1:$' } });

        // Add a new command
        const addCommandBtn = screen.getByText(/Add Command/i);
        fireEvent.click(addCommandBtn);

        // Verify there are two command lines with 'custom@ps1:$'
        const ps1Inputs = screen.getAllByDisplayValue('custom@ps1:$');
        expect(ps1Inputs.length).toBe(2);
    });

    it('allows removing a line', () => {
        render(<App />);
        // Initial state has 2 lines. Let's find the first trash button and click it
        const removeBtns = screen.getAllByTitle('Remove Line');
        expect(removeBtns.length).toBe(2);

        fireEvent.click(removeBtns[0]);

        const remainingLines = screen.getAllByText(/Line \d/i);
        expect(remainingLines.length).toBe(1);
    });

    it('switches themes correctly', () => {
        render(<App />);
        const lightThemeBtn = screen.getByText(/Light Mode/i);
        fireEvent.click(lightThemeBtn);

        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
});
