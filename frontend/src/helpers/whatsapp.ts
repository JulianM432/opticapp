const WHATSAPP_MESSAGE_TEMPLATE =
  'Hola! Quiero consultar el precio del armazón {brand} {model} ({color}).';

export function buildWhatsAppMessage(
  brand: string,
  model: string,
  color: string,
): string {
  return WHATSAPP_MESSAGE_TEMPLATE.replace('{brand}', brand)
    .replace('{model}', model)
    .replace('{color}', color);
}

export function buildWhatsAppUrl(
  brand: string,
  model: string,
  color: string,
): string {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER?.trim();

  if (!number) {
    return '';
  }

  const message = buildWhatsAppMessage(brand, model, color);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
