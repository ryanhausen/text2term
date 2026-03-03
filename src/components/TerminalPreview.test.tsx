import { render, screen } from '@testing-library/react';
import { TerminalPreview } from './TerminalPreview';
import type { TerminalLine } from '../types';

describe('TerminalPreview Component', () => {
    it('renders command lines with PS1 correctly', () => {
        const lines: TerminalLine[] = [
            { id: '1', type: 'command', ps1: 'root@server:~#', text: 'ls -la' }
        ];
        render(<TerminalPreview lines={lines} />);

        expect(screen.getAllByText('root@server:~#').length).toBeGreaterThan(0);
        expect(screen.getByText('ls -la')).toBeInTheDocument();
    });

    it('renders output lines without PS1', () => {
        const lines: TerminalLine[] = [
            { id: '2', type: 'output', ps1: '', text: 'total 42' }
        ];
        render(<TerminalPreview lines={lines} />);

        expect(screen.getByText('total 42')).toBeInTheDocument();
        // make sure root@server doesn't exist
        expect(screen.queryByText('root@server:~#')).not.toBeInTheDocument();
    });

    it('renders the mac style window buttons', () => {
        render(<TerminalPreview lines={[]} />);

        const closeBtn = document.querySelector('.mac-close');
        expect(closeBtn).toBeInTheDocument();
        const minBtn = document.querySelector('.mac-min');
        expect(minBtn).toBeInTheDocument();
        const maxBtn = document.querySelector('.mac-max');
        expect(maxBtn).toBeInTheDocument();
    });
});
