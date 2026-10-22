import { HugeiconsIcon } from '@hugeicons/react';
import ComputerIcon from '@hugeicons/core-free-icons/ComputerIcon';
import Moon01Icon from '@hugeicons/core-free-icons/Moon01Icon';
import Sun01Icon from '@hugeicons/core-free-icons/Sun01Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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

const THEME_OPTIONS = Object.keys(THEME_LABELS) as Theme[];

function isTheme(value: string): value is Theme {
  return value in THEME_LABELS;
}

type ThemeToggleProps = {
  align?: 'start' | 'center' | 'end';
};

export function ThemeToggle({ align = 'end' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const CurrentIcon = THEME_ICONS[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={`Tema: ${THEME_LABELS[theme]}. Elegir apariencia.`}
          className="min-h-11 min-w-11 sm:min-h-9 sm:min-w-9"
          size="sm"
          type="button"
          variant="outline"
        >
          <HugeiconsIcon
            icon={CurrentIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          <span className="hidden sm:inline">{THEME_LABELS[theme]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Apariencia</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={(value) => {
              if (isTheme(value)) {
                setTheme(value);
              }
            }}
            value={theme}
          >
            {THEME_OPTIONS.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                <HugeiconsIcon icon={THEME_ICONS[option]} strokeWidth={2} />
                {THEME_LABELS[option]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
