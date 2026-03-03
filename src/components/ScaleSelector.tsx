import React from 'react';

interface ScaleSelectorProps {
    containerScale: number;
    textScale: number;
    onContainerScaleChange: (scale: number) => void;
    onTextScaleChange: (scale: number) => void;
}

const SCALE_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5];

export const ScaleSelector: React.FC<ScaleSelectorProps> = ({
    containerScale,
    textScale,
    onContainerScaleChange,
    onTextScaleChange
}) => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Scale</h2>

            <div style={{ marginBottom: '16px' }}>
                <div style={{ marginBottom: '8px', fontSize: '0.9rem', opacity: 0.9 }}>Container</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {SCALE_OPTIONS.map(scale => (
                        <button
                            key={`container-${scale}`}
                            className={`btn-export ${containerScale === scale ? 'active' : ''}`}
                            onClick={() => onContainerScaleChange(scale)}
                            style={containerScale === scale ? { background: 'var(--accent-color)', color: 'white', borderColor: 'var(--accent-color)' } : {}}
                        >
                            {scale * 100}%
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div style={{ marginBottom: '8px', fontSize: '0.9rem', opacity: 0.9 }}>Text</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {SCALE_OPTIONS.map(scale => (
                        <button
                            key={`text-${scale}`}
                            className={`btn-export ${textScale === scale ? 'active' : ''}`}
                            onClick={() => onTextScaleChange(scale)}
                            style={textScale === scale ? { background: 'var(--accent-color)', color: 'white', borderColor: 'var(--accent-color)' } : {}}
                        >
                            {scale * 100}%
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
