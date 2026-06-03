import { useState, useEffect } from 'react';
import { ThemeName, Theme } from '@/types';

export const THEMES: Theme[] = [
  {
    name: 'indigo',
    label: '🟣 Indigo',
    colors: {
      bg: '#f0f4ff',
      surface: '#ffffff',
      surfaceHover: '#f5f8ff',
      border: '#e2e8f0',
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      primaryLight: '#e0e7ff',
      shadowMd: '0 4px 16px rgba(99,102,241,0.10)',
      shadowLg: '0 8px 32px rgba(99,102,241,0.15)',
    },
  },
  {
    name: 'rose',
    label: '🔴 Rose',
    colors: {
      bg: '#fff1f2',
      surface: '#ffffff',
      surfaceHover: '#fff5f6',
      border: '#fecdd3',
      primary: '#f43f5e',
      primaryHover: '#e11d48',
      primaryLight: '#ffe4e6',
      shadowMd: '0 4px 16px rgba(244,63,94,0.10)',
      shadowLg: '0 8px 32px rgba(244,63,94,0.15)',
    },
  },
  {
    name: 'emerald',
    label: '🟢 Emerald',
    colors: {
      bg: '#ecfdf5',
      surface: '#ffffff',
      surfaceHover: '#f0fdf8',
      border: '#a7f3d0',
      primary: '#10b981',
      primaryHover: '#059669',
      primaryLight: '#d1fae5',
      shadowMd: '0 4px 16px rgba(16,185,129,0.10)',
      shadowLg: '0 8px 32px rgba(16,185,129,0.15)',
    },
  },
  {
    name: 'amber',
    label: '🟡 Amber',
    colors: {
      bg: '#fffbeb',
      surface: '#ffffff',
      surfaceHover: '#fefce8',
      border: '#fde68a',
      primary: '#f59e0b',
      primaryHover: '#d97706',
      primaryLight: '#fef3c7',
      shadowMd: '0 4px 16px rgba(245,158,11,0.10)',
      shadowLg: '0 8px 32px rgba(245,158,11,0.15)',
    },
  },
  {
    name: 'violet',
    label: '💜 Violet',
    colors: {
      bg: '#f5f3ff',
      surface: '#ffffff',
      surfaceHover: '#f8f7ff',
      border: '#ddd6fe',
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      primaryLight: '#ede9fe',
      shadowMd: '0 4px 16px rgba(139,92,246,0.10)',
      shadowLg: '0 8px 32px rgba(139,92,246,0.15)',
    },
  },
  {
    name: 'sky',
    label: '🔵 Sky',
    colors: {
      bg: '#f0f9ff',
      surface: '#ffffff',
      surfaceHover: '#f0faff',
      border: '#bae6fd',
      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      primaryLight: '#e0f2fe',
      shadowMd: '0 4px 16px rgba(14,165,233,0.10)',
      shadowLg: '0 8px 32px rgba(14,165,233,0.15)',
    },
  },
];

function loadTheme(): ThemeName {
  try {
    const stored = localStorage.getItem('todo-theme');
    if (stored && THEMES.find((t) => t.name === stored)) {
      return stored as ThemeName;
    }
  } catch {
    // ignore
  }
  return 'indigo';
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.style.setProperty('--color-bg', theme.colors.bg);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-surface-hover', theme.colors.surfaceHover);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
  root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
  root.style.setProperty('--shadow-md', theme.colors.shadowMd);
  root.style.setProperty('--shadow-lg', theme.colors.shadowLg);
}

export function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>(loadTheme);

  useEffect(() => {
    const theme = THEMES.find((t) => t.name === themeName) ?? THEMES[0];
    applyTheme(theme);
    try {
      localStorage.setItem('todo-theme', themeName);
    } catch {
      // ignore
    }
  }, [themeName]);

  return { themeName, setThemeName };
}
