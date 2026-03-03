import React from 'react';
import type { TerminalLine } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface InputPanelProps {
    lines: TerminalLine[];
    onAddLine: (type: 'command' | 'output') => void;
    onUpdateLine: (id: string, updates: Partial<TerminalLine>) => void;
    onRemoveLine: (id: string) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
    lines,
    onAddLine,
    onUpdateLine,
    onRemoveLine
}) => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Terminal Inputs</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {lines.map((line, index) => (
                    <div key={line.id} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '16px',
                        background: 'rgba(0, 0, 0, 0.1)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8 }}>
                                Line {index + 1}
                            </span>
                            <button
                                onClick={() => onRemoveLine(line.id)}
                                className="btn-icon"
                                title="Remove Line"
                                style={{ color: '#ef4444' }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <select
                                value={line.type}
                                onChange={(e) => onUpdateLine(line.id, { type: e.target.value as 'command' | 'output' })}
                                style={{ width: '120px' }}
                            >
                                <option value="command">Command</option>
                                <option value="output">Output</option>
                            </select>

                            {line.type === 'command' && (
                                <input
                                    type="text"
                                    placeholder="PS1 (e.g. user@host:~$)"
                                    value={line.ps1}
                                    onChange={(e) => onUpdateLine(line.id, { ps1: e.target.value })}
                                    style={{ width: '200px' }}
                                />
                            )}
                        </div>

                        <textarea
                            placeholder={line.type === 'command' ? "Enter command here..." : "Enter command output here..."}
                            value={line.text}
                            onChange={(e) => onUpdateLine(line.id, { text: e.target.value })}
                            rows={line.type === 'output' ? 3 : 1}
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-primary" onClick={() => onAddLine('command')}>
                    <Plus size={18} /> Add Command
                </button>
                <button className="btn-primary" onClick={() => onAddLine('output')} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                    <Plus size={18} /> Add Output
                </button>
            </div>
        </div>
    );
};
