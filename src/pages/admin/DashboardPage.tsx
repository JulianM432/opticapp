import { Link } from 'react-router-dom';
import { PackageIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido, {user?.firstName}. Elegí una sección para continuar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>Productos</CardTitle>
                <CardDescription>
                  Gestioná el catálogo de armazones.
                </CardDescription>
              </div>
              <PackageIcon className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Creá, editá y publicá armazones en el catálogo.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild type="button">
              <Link to="/admin/products">Ir a productos</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>Mi perfil</CardTitle>
                <CardDescription>
                  Consultá tu email, nombre y apellido.
                </CardDescription>
              </div>
              <UserIcon className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild type="button">
              <Link to="/admin/profile">Ver perfil</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
