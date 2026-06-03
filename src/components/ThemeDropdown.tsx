import { useRef, useState, useEffect } from 'react';
import { ThemeName } from '@/types';
import { THEMES } from '@/hooks/useTheme';
import { Palette, ChevronDown } from 'lucide-react';

type ThemeDropdownProps = {
  themeName: ThemeName;
  onThemeChange: (name: ThemeName) => void;
};

export default function ThemeDropdown({ themeName, onThemeChange }: ThemeDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const current = THEMES.find((t) => t.name === themeName) ?? THEMES[0];

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text-muted)',
          fontSize: '0.83rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'border-color var(--transition), color var(--transition)',
          fontFamily: 'inherit',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Palette size={15} color="var(--color-primary)" />
        <span>{current.label}</span>
        <ChevronDown
          size={13}
          style={{
            transition: 'transform 150ms ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '148px',
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '4px',
            margin: 0,
            listStyle: 'none',
            zIndex: 100,
          }}
        >
          {THEMES.map((theme) => {
            const isActive = theme.name === themeName;
            return (
              <li key={theme.name}>
                <button
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onThemeChange(theme.name);
                    setOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '7px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? theme.colors.primary : 'var(--color-text)',
                    background: isActive ? theme.colors.primaryLight : 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 120ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: theme.colors.primary,
                      flexShrink: 0,
                    }}
                  />
                  {theme.label.replace(/^.+? /, '')}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
