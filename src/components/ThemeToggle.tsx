import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme, type Theme } from '@/components/theme-provider';

const THEME_ORDER: Theme[] = ['light', 'dark', 'system'];

const THEME_LABELS: Record<Theme, string> = {
  light: 'Claro',
  dark: 'Oscuro',
  system: 'Sistema',
};

function nextTheme(theme: Theme): Theme {
  const index = THEME_ORDER.indexOf(theme);
  return THEME_ORDER[(index + 1) % THEME_ORDER.length];
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const upcoming = nextTheme(theme);

  return (
    <Button
      aria-label={`Cambiar tema. Actual: ${THEME_LABELS[theme]}. Siguiente: ${THEME_LABELS[upcoming]}`}
      onClick={() => setTheme(upcoming)}
      size="sm"
      type="button"
      variant="outline"
    >
      {theme === 'light' && <Sun />}
      {theme === 'dark' && <Moon />}
      {theme === 'system' && <Monitor />}
      <span>{THEME_LABELS[theme]}</span>
    </Button>
  );
}
