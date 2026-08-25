import { HugeiconsIcon } from '@hugeicons/react';
import {
  ComputerIcon,
  Moon01Icon,
  Sun01Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme, type Theme } from '@/components/theme-provider';

const THEME_LABELS: Record<Theme, string> = {
  light: 'Claro',
  dark: 'Oscuro',
  system: 'Sistema',
};

const THEME_ICONS: Record<Theme, typeof Sun01Icon> = {
  light: Sun01Icon,
  dark: Moon01Icon,
  system: ComputerIcon,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const CurrentIcon = THEME_ICONS[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={`Tema: ${THEME_LABELS[theme]}. Elegir apariencia.`}
          size="sm"
          type="button"
          variant="outline"
        >
          <HugeiconsIcon icon={CurrentIcon} strokeWidth={2} data-icon="inline-start" />
          <span className="hidden sm:inline">{THEME_LABELS[theme]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(THEME_LABELS) as Theme[]).map((option) => (
          <DropdownMenuItem key={option} onClick={() => setTheme(option)}>
            <HugeiconsIcon icon={THEME_ICONS[option]} strokeWidth={2} />
            {THEME_LABELS[option]}
            {theme === option && (
              <HugeiconsIcon
                className="ml-auto"
                icon={Tick02Icon}
                strokeWidth={2}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
