export const MATERIAL_VALUES = [
  'acetate',
  'metal',
  'tr90',
  'titanium',
  'mixed',
  'other',
] as const;

export type Material = (typeof MATERIAL_VALUES)[number];

const MATERIAL_LABELS: Record<Material, string> = {
  acetate: 'Acetato',
  metal: 'Metal',
  tr90: 'TR90',
  titanium: 'Titanio',
  mixed: 'Mixto',
  other: 'Otro',
};

export const MATERIAL_OPTIONS = MATERIAL_VALUES.map((value) => ({
  value,
  label: MATERIAL_LABELS[value],
}));

export function getMaterialLabel(material: string): string {
  return MATERIAL_LABELS[material as Material] ?? material;
}
