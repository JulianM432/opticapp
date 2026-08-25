import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Mi perfil</h1>
        <p className="text-muted-foreground">
          Datos de tu cuenta de administrador (solo lectura).
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Información personal</CardTitle>
          <CardDescription>
            Estos datos provienen de tu sesión activa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="profile-email">Email</FieldLabel>
              <Input
                id="profile-email"
                readOnly
                value={user?.email ?? ''}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="profile-first-name">Nombre</FieldLabel>
              <Input
                id="profile-first-name"
                readOnly
                value={user?.firstName ?? ''}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="profile-last-name">Apellido</FieldLabel>
              <Input
                id="profile-last-name"
                readOnly
                value={user?.lastName ?? ''}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
