import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMaterialLabel } from '@/constants/materials';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import type { ProductAdmin } from '@/types/product';

function ProductsTableSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="h-12 w-full rounded-md" key={index} />
      ))}
    </div>
  );
}

function DeleteProductDialog({
  product,
  open,
  onOpenChange,
  onConfirm,
}: {
  product: ProductAdmin | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      // Error toast handled in hook
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription>
            {product
              ? `Se eliminará "${product.brand} ${product.model}" del catálogo. Esta acción no se puede deshacer.`
              : 'Se eliminará el producto del catálogo. Esta acción no se puede deshacer.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={() => void handleConfirm()}
            variant="destructive"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ProductsListPage() {
  const { products, isLoading, error, refetch, deleteProduct } =
    useAdminProducts();
  const [productToDelete, setProductToDelete] = useState<ProductAdmin | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Gestioná el catálogo de armazones.
          </p>
        </div>
        <Button asChild type="button">
          <Link to="/admin/products/new">
            <PlusIcon data-icon="inline-start" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      {isLoading && <ProductsTableSkeleton />}

      {!isLoading && error && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-destructive">{error}</p>
          <Button
            className="w-fit"
            onClick={refetch}
            size="sm"
            type="button"
            variant="outline"
          >
            Reintentar
          </Button>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <Empty className="border border-dashed border-border/80 py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PlusIcon />
            </EmptyMedia>
            <EmptyTitle>Sin productos</EmptyTitle>
            <EmptyDescription>
              Todavía no hay armazones cargados. Creá el primero para empezar.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild type="button">
            <Link to="/admin/products/new">Crear producto</Link>
          </Button>
        </Empty>
      )}

      {!isLoading && !error && products.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.brand}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{getMaterialLabel(product.material)}</TableCell>
                <TableCell>
                  {product.isPublished ? (
                    <Badge variant="default">Publicado</Badge>
                  ) : (
                    <Badge variant="secondary">Borrador</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" type="button" variant="outline">
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <PencilIcon data-icon="inline-start" />
                        Editar
                      </Link>
                    </Button>
                    <Button
                      onClick={() => setProductToDelete(product)}
                      size="sm"
                      type="button"
                      variant="destructive"
                    >
                      <Trash2Icon data-icon="inline-start" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <DeleteProductDialog
        onConfirm={async () => {
          if (productToDelete) {
            await deleteProduct(productToDelete.id);
          }
        }}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDelete(null);
          }
        }}
        open={productToDelete !== null}
        product={productToDelete}
      />
    </div>
  );
}
