import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductForm } from '@/components/admin/ProductForm';
import { useAdminProduct } from '@/hooks/useAdminProduct';
import { useSaveProduct } from '@/hooks/useSaveProduct';
import type { ProductFormValues } from '@/types/product';

export function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { product, isLoading, isNotFound, error } = useAdminProduct(id);
  const { isSubmitting, createProduct, updateProduct } = useSaveProduct();

  const handleSubmit = async (values: ProductFormValues, files: File[]) => {
    if (isEditing && id) {
      await updateProduct(id, values, files);
    } else {
      await createProduct(values, files);
    }

    navigate('/admin/products');
  };

  if (isEditing && isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-96 w-full max-w-2xl rounded-xl" />
      </div>
    );
  }

  if (isEditing && (isNotFound || error)) {
    return (
      <div className="flex flex-col gap-6">
        <Alert variant="destructive">
          <AlertTitle>Producto no encontrado</AlertTitle>
          <AlertDescription>
            {error ??
              'El producto que intentás editar no existe o fue eliminado.'}
          </AlertDescription>
        </Alert>
        <Button asChild className="w-fit" type="button" variant="outline">
          <Link to="/admin/products">Volver al listado</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isEditing ? 'Editar producto' : 'Nuevo producto'}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? 'Modificá los datos del armazón.'
            : 'Completá los datos para cargar un nuevo armazón.'}
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Datos del producto</CardTitle>
          <CardDescription>
            Los campos obligatorios están marcados con validación del
            formulario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            initialProduct={product ?? undefined}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            submitLabel={isEditing ? 'Guardar cambios' : 'Crear producto'}
          />
        </CardContent>
      </Card>
    </div>
  );
}
