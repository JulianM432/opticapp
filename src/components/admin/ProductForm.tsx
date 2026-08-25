import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MATERIAL_OPTIONS } from '@/constants/materials';
import { resolveProductImageUrl } from '@/helpers/productImage';
import type { ProductAdmin, ProductFormValues } from '@/types/product';

interface ProductFormProps {
  initialProduct?: ProductAdmin;
  isSubmitting: boolean;
  onSubmit: (values: ProductFormValues, files: File[]) => Promise<void>;
  submitLabel: string;
}

const defaultValues: ProductFormValues = {
  brand: '',
  model: '',
  color: '',
  material: 'acetate',
  description: '',
  isPublished: false,
};

export function ProductForm({
  initialProduct,
  isSubmitting,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(defaultValues);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (initialProduct) {
      setValues({
        brand: initialProduct.brand,
        model: initialProduct.model,
        color: initialProduct.color,
        material: initialProduct.material,
        description: initialProduct.description ?? '',
        isPublished: initialProduct.isPublished,
      });
    }
  }, [initialProduct]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      for (const url of urls) {
        URL.revokeObjectURL(url);
      }
    };
  }, [files]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values, files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (!selected) {
      return;
    }

    setFiles(Array.from(selected));
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="brand">Marca</FieldLabel>
          <Input
            id="brand"
            name="brand"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                brand: event.target.value,
              }))
            }
            required
            value={values.brand}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="model">Modelo</FieldLabel>
          <Input
            id="model"
            name="model"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                model: event.target.value,
              }))
            }
            required
            value={values.model}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="color">Color</FieldLabel>
          <Input
            id="color"
            name="color"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                color: event.target.value,
              }))
            }
            required
            value={values.color}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="material">Material</FieldLabel>
          <Select
            onValueChange={(value) =>
              setValues((current) => ({ ...current, material: value }))
            }
            value={values.material}
          >
            <SelectTrigger className="w-full" id="material">
              <SelectValue placeholder="Seleccioná un material" />
            </SelectTrigger>
            <SelectContent>
              {MATERIAL_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <Textarea
            id="description"
            name="description"
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            rows={4}
            value={values.description}
          />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="isPublished">Publicado</FieldLabel>
          <Switch
            checked={values.isPublished}
            id="isPublished"
            onCheckedChange={(checked) =>
              setValues((current) => ({
                ...current,
                isPublished: checked,
              }))
            }
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="images">Imágenes</FieldLabel>
          <Input
            accept="image/jpeg,image/png,image/webp,image/gif"
            id="images"
            multiple
            name="images"
            onChange={handleFileChange}
            type="file"
          />
          <p className="text-xs text-muted-foreground">
            Podés subir varias imágenes (JPEG, PNG, WebP o GIF).
          </p>
        </Field>
      </FieldGroup>

      {initialProduct && initialProduct.images.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Imágenes actuales</p>
          <div className="flex flex-wrap gap-3">
            {initialProduct.images.map((image) => (
              <img
                alt={`${initialProduct.brand} ${initialProduct.model}`}
                className="size-20 rounded-md border object-cover"
                key={image}
                src={resolveProductImageUrl(image)}
              />
            ))}
          </div>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Nuevas imágenes</p>
          <div className="flex flex-wrap gap-3">
            {previewUrls.map((url) => (
              <img
                alt="Vista previa"
                className="size-20 rounded-md border object-cover"
                key={url}
                src={url}
              />
            ))}
          </div>
        </div>
      )}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting && <Spinner data-icon="inline-start" />}
        {submitLabel}
      </Button>
    </form>
  );
}
