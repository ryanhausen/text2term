import React, { useState } from 'react';
import type { ThemeName, ThemeColors } from '../types';

interface ThemeSelectorProps {
    currentTheme: ThemeName;
    onThemeChange: (theme: ThemeName) => void;
    customColors: ThemeColors;
    onCustomColorsChange: (colors: ThemeColors) => void;
}

const COLOR_LABELS: { key: keyof ThemeColors; label: string }[] = [
    { key: 'bgColor', label: 'Background' },
    { key: 'textColor', label: 'Text' },
    { key: 'panelBg', label: 'Panel Background' },
    { key: 'borderColor', label: 'Border' },
    { key: 'accentColor', label: 'Accent' },
    { key: 'accentHover', label: 'Accent Hover' },
    { key: 'termBg', label: 'Terminal Background' },
    { key: 'termText', label: 'Terminal Text' },
    { key: 'termBorder', label: 'Terminal Border' },
    { key: 'glassBorder', label: 'Glass Border' },
    { key: 'inputBg', label: 'Input Background' },
    { key: 'inputBorder', label: 'Input Border' },
];

const THEMES: { id: ThemeName; label: string; previewColor: string }[] = [
    { id: 'dark', label: 'Dark Default', previewColor: '#0f1115' },
    { id: 'light', label: 'Light Mode', previewColor: '#f8fafc' },
    { id: 'solaris', label: 'Solarized', previewColor: '#002b36' },
    { id: 'hacker', label: 'Hacker', previewColor: '#000000' },
    { id: 'powershell', label: 'Powershell', previewColor: '#012456' },
    { id: 'custom', label: 'Custom', previewColor: 'conic-gradient(from 90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange, customColors, onCustomColorsChange }) => {
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    const handleThemeClick = (themeId: ThemeName) => {
        onThemeChange(themeId);
        if (themeId === 'custom') {
            setIsCustomModalOpen(true);
        }
    };

    const handleColorChange = (key: keyof ThemeColors, value: string) => {
        onCustomColorsChange({
            ...customColors,
            [key]: value
        });
    };

    return (
        <>
            <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Themes</h2>
                    {currentTheme === 'custom' && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsCustomModalOpen(true); }}
                            className="btn-primary"
                            style={{ padding: '4px 12px', fontSize: '0.85rem' }}
                        >
                            Edit Colors
                        </button>
                    )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => handleThemeClick(theme.id)}
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

            {/* Custom Theme Modal */}
            <div className={`modal-overlay ${isCustomModalOpen ? 'open' : ''}`} onClick={() => setIsCustomModalOpen(false)}>
                <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={() => setIsCustomModalOpen(false)}>×</button>
                    <h2 style={{ marginBottom: '8px' }}>Custom Theme Colors</h2>
                    <p className="subtitle" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Choose colors for your custom theme instantly.</p>

                    <div className="color-input-grid">
                        {COLOR_LABELS.map(({ key, label }) => (
                            <div key={key} className="color-input-item">
                                <label>{label}</label>
                                <input
                                    type="color"
                                    value={customColors[key] || '#000000'}
                                    onChange={(e) => handleColorChange(key, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                        onClick={() => setIsCustomModalOpen(false)}
                    >
                        Done
                    </button>
                </div>
            </div>
        </>
    );
};
