import React, { useState } from 'react';
import { toPng, toSvg, toBlob } from 'html-to-image';
import { Download, Image as ImageIcon, Copy, Check } from 'lucide-react';

export const ExportPanel: React.FC = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [toastMessage, setToastMessage] = useState<{ text: string, type: 'download' | 'copy' } | null>(null);

    const showToast = (text: string, type: 'download' | 'copy') => {
        setToastMessage({ text, type });
        setTimeout(() => setToastMessage(null), 3000);
    };

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
                    showToast('Image Copied to Clipboad!', 'copy');
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
            showToast('Downloading Image!', 'download');
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
                    className="btn-export"
                    onClick={() => handleExport('svg')}
                    disabled={isExporting}
                >
                    <Download size={16} /> SVG
                </button>
                <button
                    className="btn-export"
                    onClick={() => handleExport('png')}
                    disabled={isExporting}
                >
                    <ImageIcon size={16} /> PNG
                </button>
                <button
                    className="btn-export"
                    onClick={() => handleExport('clipboard')}
                    disabled={isExporting}
                >
                    <Copy size={16} /> Copy
                </button>
            </div>
            {toastMessage && (
                <div className="toast-message">
                    {toastMessage.type === 'copy' ? <Check size={16} /> : <Download size={16} />}
                    {toastMessage.text}
                </div>
            )}
        </div>
    );
};
