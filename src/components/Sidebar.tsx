import { X } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Settings</h2>
                    <button onClick={onClose} className="btn-icon" aria-label="Close sidebar">
                        <X size={20} />
                    </button>
                </div>
                <div className="sidebar-content">
                    {children}
                </div>
            </aside>
        </>
    );
}
