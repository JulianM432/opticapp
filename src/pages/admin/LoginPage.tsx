import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getApiErrorMessage } from '@/api/client';
import { useAuth } from '@/hooks/useAuth';
import { STORE_INFO } from '@/constants/store';

export function LoginPage() {
  const { user, isLoading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && user) {
    return <Navigate replace to="/admin" />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo iniciar sesión'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-end border-b px-4 py-3">
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center gap-4 text-center">
            <img alt="Opticapp" className="size-10" src="/logo.svg" />
            <div className="flex flex-col gap-1">
              <CardTitle>Panel de administración</CardTitle>
              <CardDescription>
                Iniciá sesión para gestionar {STORE_INFO.name}.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error de acceso</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FieldGroup>
                <Field data-invalid={error ? true : undefined}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    aria-invalid={error ? true : undefined}
                    autoComplete="email"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    type="email"
                    value={email}
                  />
                </Field>

                <Field data-invalid={error ? true : undefined}>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      aria-invalid={error ? true : undefined}
                      autoComplete="current-password"
                      id="password"
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        aria-label={
                          showPassword
                            ? 'Ocultar contraseña'
                            : 'Mostrar contraseña'
                        }
                        onClick={() => setShowPassword((current) => !current)}
                        type="button"
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>

              <Button disabled={isSubmitting || isLoading} type="submit">
                {isSubmitting && <Spinner data-icon="inline-start" />}
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
