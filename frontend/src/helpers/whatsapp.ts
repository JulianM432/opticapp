const WHATSAPP_MESSAGE_TEMPLATE =
  '¡Hola! Quería consultar precio y disponibilidad del armazón {brand} {model} ({color}).';

const WHATSAPP_CONTACT_MESSAGE = '¡Hola! Quería hacerles una consulta.';

function getWhatsAppNumber(): string | null {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER?.trim();
  return number ? number : null;
}

function toWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppMessage(
  brand: string,
  model: string,
  color: string,
): string {
  return WHATSAPP_MESSAGE_TEMPLATE.replace('{brand}', brand)
    .replace('{model}', model)
    .replace('{color}', color);
}

/** Product inquiry link. Returns `null` when no WhatsApp number is configured. */
export function buildWhatsAppUrl(
  brand: string,
  model: string,
  color: string,
): string | null {
  const number = getWhatsAppNumber();

  if (!number) {
    return null;
  }

  return toWhatsAppUrl(number, buildWhatsAppMessage(brand, model, color));
}

/** Generic contact link. Returns `null` when no WhatsApp number is configured. */
export function buildWhatsAppContactUrl(): string | null {
  const number = getWhatsAppNumber();

  if (!number) {
    return null;
  }

  return toWhatsAppUrl(number, WHATSAPP_CONTACT_MESSAGE);
}
