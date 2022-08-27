export const possibleButtonTypes = ['normal', 'cancel'] as const;

export type ButtonType = typeof possibleButtonTypes[number];
