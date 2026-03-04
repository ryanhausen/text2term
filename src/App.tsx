import { useState, useEffect } from 'react';
import type { TerminalLine, ThemeName, ThemeColors } from './types';
import { TerminalPreview } from './components/TerminalPreview';
import { InputPanel } from './components/InputPanel';
import { ThemeSelector } from './components/ThemeSelector';
import { ExportPanel } from './components/ExportPanel';
import { ScaleSelector } from './components/ScaleSelector';
import { Terminal, Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [customColors, setCustomColors] = useState<ThemeColors>({
    bgColor: '#1a1a2e',
    textColor: '#ffffff',
    panelBg: 'rgba(26, 26, 46, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    accentColor: '#e94560',
    accentHover: '#ff4c68',
    termBg: '#16213e',
    termText: '#f8f8f2',
    termBorder: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    inputBg: 'rgba(26, 26, 46, 0.6)',
    inputBorder: 'rgba(255, 255, 255, 0.3)',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [containerScale, setContainerScale] = useState<number>(1);
  const [textScale, setTextScale] = useState<number>(1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: crypto.randomUUID(),
      type: 'command',
      ps1: 'user@host:~$',
      text: 'echo "Hello, Stylized Terminal!"'
    },
    {
      id: crypto.randomUUID(),
      type: 'output',
      ps1: '',
      text: 'Hello, Stylized Terminal!'
    }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const cssVarMap: Record<keyof ThemeColors, string> = {
      bgColor: '--bg-color',
      textColor: '--text-color',
      panelBg: '--panel-bg',
      borderColor: '--border-color',
      accentColor: '--accent-color',
      accentHover: '--accent-hover',
      termBg: '--term-bg',
      termText: '--term-text',
      termBorder: '--term-border',
      glassBorder: '--glass-border',
      inputBg: '--input-bg',
      inputBorder: '--input-border',
    };

    if (theme === 'custom') {
      Object.entries(customColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(cssVarMap[key as keyof ThemeColors], value);
      });
    } else {
      Object.values(cssVarMap).forEach((cssVar) => {
        document.documentElement.style.removeProperty(cssVar);
      });
    }
  }, [theme, customColors]);

  const handleAddLine = (type: 'command' | 'output') => {
    setLines([...lines, {
      id: crypto.randomUUID(),
      type,
      ps1: type === 'command' ? 'user@host:~$' : '',
      text: ''
    }]);
  };

  const handleUpdateLine = (id: string, updates: Partial<TerminalLine>) => {
    setLines(lines.map(line =>
      line.id === id ? { ...line, ...updates } : line
    ));
  };

  const handleRemoveLine = (id: string) => {
    setLines(lines.filter(line => line.id !== id));
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Settings Toggle Button */}
      <div style={{ position: 'fixed', top: '32px', left: '32px', zIndex: 10 }}>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="btn-icon glass-panel"
          style={{ width: '48px', height: '48px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          aria-label="Open Settings"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <ThemeSelector
          currentTheme={theme}
          onThemeChange={setTheme}
          customColors={customColors}
          onCustomColorsChange={setCustomColors}
        />
        <div style={{ height: '24px' }} /> {/* Spacing */}
        <ScaleSelector
          containerScale={containerScale}
          textScale={textScale}
          onContainerScaleChange={setContainerScale}
          onTextScaleChange={setTextScale}
        />
        <div style={{ height: '24px' }} /> {/* Spacing */}
        <ExportPanel />
      </Sidebar>

      <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--panel-bg)', padding: '16px', borderRadius: '50%', marginBottom: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <Terminal size={48} color="var(--accent-color)" />
        </div>
        <h1>Stylized Terminal Exporter</h1>
        <p className="subtitle">Create beautiful, high-resolution terminal mockups for your presentations or readmes.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
        <div style={{ position: 'sticky', top: '32px', zIndex: isSidebarOpen ? 100 : 5, transition: `z-index 0s ${isSidebarOpen ? '0s' : '0.3s'}`, width: '100%', display: 'flex', justifyContent: 'center' }} className="animate-fade-in">
          <div className="glass-panel" style={{ padding: '32px', background: 'var(--panel-bg)', width: '100%', maxWidth: `calc(800px * ${containerScale})`, transition: 'max-width 0.2s ease-out' }}>
            <TerminalPreview lines={lines} containerScale={containerScale} textScale={textScale} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '800px' }}>
          <InputPanel
            lines={lines}
            onAddLine={handleAddLine}
            onUpdateLine={handleUpdateLine}
            onRemoveLine={handleRemoveLine}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
