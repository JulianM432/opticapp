const MATERIAL_LABELS: Record<string, string> = {
  acetate: 'Acetato',
  metal: 'Metal',
  tr90: 'TR90',
  titanium: 'Titanio',
  mixed: 'Mixto',
  other: 'Otro',
};

export function getMaterialLabel(material: string): string {
  return MATERIAL_LABELS[material] ?? material;
}
