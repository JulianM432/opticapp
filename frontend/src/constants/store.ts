// `||` rather than `??`: an empty `VITE_X=` line in .env should still fall back.
export const STORE_INFO = {
  name: import.meta.env.VITE_STORE_NAME?.trim() || 'Óptica',
  address: import.meta.env.VITE_ADDRESS?.trim() || 'Fake Address 1234',
  phone: import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || '3434123456',
  /** Human-readable phone, for visible labels. */
  phoneDisplay: '343 412-3456',
  /** E.164 phone, for `tel:` links. */
  phoneE164: '+543434123456',
};

export const STORE_PHONE_HREF = `tel:${STORE_INFO.phoneE164}`;
