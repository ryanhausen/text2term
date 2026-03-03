import React from 'react';
import type { TerminalLine } from '../types';

interface TerminalPreviewProps {
    lines: TerminalLine[];
    containerScale: number;
    textScale: number;
}

export const TerminalPreview: React.FC<TerminalPreviewProps> = ({ lines, containerScale, textScale }) => {
    return (
        <div
            className="terminal-window"
            id="terminal-export-node"
            style={{
                '--container-scale': containerScale,
                '--text-scale': textScale
            } as React.CSSProperties}
        >
            <div className="terminal-header">
                <div className="mac-buttons">
                    <div className="mac-btn mac-close"></div>
                    <div className="mac-btn mac-min"></div>
                    <div className="mac-btn mac-max"></div>
                </div>
                <div className="terminal-title">bash</div>
            </div>
            <div className="terminal-body terminal-font">
                {lines.map((line) => (
                    <div key={line.id} style={{ marginBottom: '8px' }}>
                        {line.type === 'command' ? (
                            <div style={{ display: 'flex', gap: '8px', wordBreak: 'break-all' }}>
                                {line.ps1 && (
                                    <span style={{
                                        color: 'var(--accent-color)',
                                        fontWeight: 'bold',
                                        whiteSpace: 'pre'
                                    }}>
                                        {line.ps1}
                                    </span>
                                )}
                                <span>{line.text}</span>
                            </div>
                        ) : (
                            <div style={{ opacity: 0.9, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {line.text}
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};
