export type TerminalLineType = 'command' | 'output';

export interface TerminalLine {
    id: string;
    type: TerminalLineType;
    ps1: string; // User-defined PS1 for command lines. Empty/ignored for output lines.
    text: string; // The typed command or output
}

export type ThemeName = 'dark' | 'light' | 'solaris' | 'hacker' | 'powershell' | 'custom';

export interface ThemeColors {
    bgColor: string;
    textColor: string;
    panelBg: string;
    borderColor: string;
    accentColor: string;
    accentHover: string;
    termBg: string;
    termText: string;
    termBorder: string;
    glassBorder: string;
    inputBg: string;
    inputBorder: string;
}
