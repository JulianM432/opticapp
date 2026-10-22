export const STORE_INFO = {
  name: 'Optica Bovril',
  address: 'Fake Address 1234',
  phone: '3434123456',
  /** Human-readable phone, for visible labels. */
  phoneDisplay: '343 412-3456',
  /** E.164 phone, for `tel:` links. */
  phoneE164: '+543434123456',
};

export const STORE_PHONE_HREF = `tel:${STORE_INFO.phoneE164}`;
