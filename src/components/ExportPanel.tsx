import React, { useState } from 'react';
import { toPng, toSvg, toBlob } from 'html-to-image';
import { Download, Image as ImageIcon, Copy } from 'lucide-react';

export const ExportPanel: React.FC = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (format: 'png' | 'svg' | 'clipboard') => {
        const node = document.getElementById('terminal-export-node');
        if (!node) return;

        try {
            setIsExporting(true);

            if (format === 'clipboard') {
                const blob = await toBlob(node, { quality: 1, pixelRatio: 2 });
                if (blob) {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                }
                return;
            }

            // Wait for font loading if necessary, but generally ok
            const dataUrl = format === 'png'
                ? await toPng(node, { quality: 1, pixelRatio: 2 })
                : await toSvg(node, { quality: 1, pixelRatio: 2 });

            const link = document.createElement('a');
            link.download = `terminal-export.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to export image', error);
            alert('Failed to export image. See console for details.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.2s' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Export Options</h2>
            <p style={{ marginBottom: '16px', opacity: 0.8, fontSize: '0.9rem' }}>
                Download your stylized terminal as a high-quality image. SVG is recommended for infinite scaling.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    className="btn-primary"
                    onClick={() => handleExport('svg')}
                    disabled={isExporting}
                    style={{ flex: 1, padding: '8px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                >
                    <Download size={16} /> SVG
                </button>
                <button
                    className="btn-primary"
                    onClick={() => handleExport('png')}
                    disabled={isExporting}
                    style={{ flex: 1, padding: '8px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                >
                    <ImageIcon size={16} /> PNG
                </button>
                <button
                    className="btn-primary"
                    onClick={() => handleExport('clipboard')}
                    disabled={isExporting}
                    style={{ flex: 1, padding: '8px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                >
                    <Copy size={16} /> Copy
                </button>
            </div>
        </div>
    );
};
