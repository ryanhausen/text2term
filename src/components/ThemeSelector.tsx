import React from 'react';
import type { ThemeName } from '../types';

interface ThemeSelectorProps {
    currentTheme: ThemeName;
    onThemeChange: (theme: ThemeName) => void;
}

const THEMES: { id: ThemeName; label: string; previewColor: string }[] = [
    { id: 'dark', label: 'Dark Default', previewColor: '#0f1115' },
    { id: 'light', label: 'Light Mode', previewColor: '#f8fafc' },
    { id: 'solaris', label: 'Solarized', previewColor: '#002b36' },
    { id: 'hacker', label: 'Hacker', previewColor: '#000000' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Themes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                {THEMES.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => onThemeChange(theme.id)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: `2px solid ${currentTheme === theme.id ? 'var(--accent-color)' : 'transparent'}`,
                            background: 'rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: theme.previewColor,
                                border: '1px solid rgba(255,255,255,0.2)',
                                boxShadow: currentTheme === theme.id ? '0 0 10px var(--accent-color)' : 'none'
                            }}
                        />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{theme.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
