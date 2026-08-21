import type { Document } from 'mongoose';

type DocumentWithId = Document & { _id: { toString(): string } };

export const mapDocument = <T extends Record<string, unknown>>(
  doc: DocumentWithId,
): Omit<T, '_id'> & { id: string } => {
  const obj = doc.toObject() as T & { _id?: unknown };
  const { _id: _removed, ...rest } = obj;

  return {
    ...rest,
    id: doc._id.toString(),
  };
};
