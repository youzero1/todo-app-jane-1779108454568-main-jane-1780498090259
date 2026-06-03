export type FilterType = 'all' | 'active' | 'completed';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type ThemeName = 'indigo' | 'rose' | 'emerald' | 'amber' | 'violet' | 'sky';

export type Theme = {
  name: ThemeName;
  label: string;
  colors: {
    bg: string;
    surface: string;
    surfaceHover: string;
    border: string;
    primary: string;
    primaryHover: string;
    primaryLight: string;
    shadowMd: string;
    shadowLg: string;
  };
};
