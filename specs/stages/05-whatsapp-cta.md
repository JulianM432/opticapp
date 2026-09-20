# Etapa 5 — WhatsApp CTA (Frontend)

**Estado:** hecha
**Depende de:** Etapa 2

## Objetivo

Botón "Consultar precio" en detalle de producto.

## Alcance

- [x] `helpers/whatsapp.ts`: `buildWhatsAppUrl(brand, model, color)`.
- [x] `components/WhatsAppButton.tsx`.
- [x] Integrar en `ProductDetailPage.tsx`.
- [x] `VITE_WHATSAPP_NUMBER` en `.env.example`.

## Fuera de alcance

- Cambios en backend (sin endpoints nuevos).
- Mostrar precio en UI.

## Contrato

```
URL: https://wa.me/{number}?text={encodeURIComponent(message)}
Mensaje: "Hola! Quiero consultar el precio del armazón {brand} {model} ({color})."
```

## Criterios de aceptación

- [x] Botón visible solo en detalle de producto.
- [x] Abre WhatsApp con mensaje prellenado correcto.
- [x] Sin precio en UI.

## Archivos esperados

```
src/helpers/whatsapp.ts
src/components/WhatsAppButton.tsx
.env.example                  (VITE_WHATSAPP_NUMBER)
```

## Notas

- Helper en **`helpers/`**, no en `lib/`.
- Sin precio en UI.
