export type TerminalLineType = 'command' | 'output';

export interface TerminalLine {
    id: string;
    type: TerminalLineType;
    ps1: string; // User-defined PS1 for command lines. Empty/ignored for output lines.
    text: string; // The typed command or output
}

export type ThemeName = 'dark' | 'light' | 'solaris' | 'hacker';
