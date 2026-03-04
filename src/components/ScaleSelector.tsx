import React from 'react';

interface ScaleSelectorProps {
    containerScale: number;
    textScale: number;
    onContainerScaleChange: (scale: number) => void;
    onTextScaleChange: (scale: number) => void;
}

const SCALE_MIN = 0.5;
const SCALE_MAX = 1.5;

export const ScaleSelector: React.FC<ScaleSelectorProps> = ({
    containerScale,
    textScale,
    onContainerScaleChange,
    onTextScaleChange
}) => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Scale</h2>

            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.9 }}>
                    <span>Container</span>
                    <span style={{ fontWeight: 500, color: 'var(--accent-color)' }}>{Math.round(containerScale * 100)}%</span>
                </div>
                <input
                    type="range"
                    min={SCALE_MIN}
                    max={SCALE_MAX}
                    step="0.01"
                    value={containerScale}
                    onChange={e => onContainerScaleChange(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.75rem', opacity: 0.5 }}>
                    <span>{SCALE_MIN * 100}%</span>
                    <span>{SCALE_MAX * 100}%</span>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.9 }}>
                    <span>Text</span>
                    <span style={{ fontWeight: 500, color: 'var(--accent-color)' }}>{Math.round(textScale * 100)}%</span>
                </div>
                <input
                    type="range"
                    min={SCALE_MIN}
                    max={SCALE_MAX}
                    step="0.01"
                    value={textScale}
                    onChange={e => onTextScaleChange(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.75rem', opacity: 0.5 }}>
                    <span>{SCALE_MIN * 100}%</span>
                    <span>{SCALE_MAX * 100}%</span>
                </div>
            </div>
        </div>
    );
};
