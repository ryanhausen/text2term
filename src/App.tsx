import { useState, useEffect } from 'react';
import type { TerminalLine, ThemeName } from './types';
import { TerminalPreview } from './components/TerminalPreview';
import { InputPanel } from './components/InputPanel';
import { ThemeSelector } from './components/ThemeSelector';
import { ExportPanel } from './components/ExportPanel';
import { Terminal } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark');
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
  }, [theme]);

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
      <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--panel-bg)', padding: '16px', borderRadius: '50%', marginBottom: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <Terminal size={48} color="var(--accent-color)" />
        </div>
        <h1>Stylized Terminal Exporter</h1>
        <p className="subtitle">Create beautiful, high-resolution terminal mockups for your presentations or readmes.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <InputPanel
            lines={lines}
            onAddLine={handleAddLine}
            onUpdateLine={handleUpdateLine}
            onRemoveLine={handleRemoveLine}
          />
          <ThemeSelector
            currentTheme={theme}
            onThemeChange={setTheme}
          />
          <ExportPanel />
        </div>

        <div style={{ position: 'sticky', top: '32px' }} className="animate-fade-in">
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', justifyContent: 'center', background: 'var(--panel-bg)' }}>
            <div style={{ width: '100%', maxWidth: '800px' }}>
              <TerminalPreview lines={lines} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
