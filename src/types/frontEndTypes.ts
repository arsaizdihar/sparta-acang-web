export const possibleButtonTypes = ['normal', 'cancel', 'disabled'] as const;

export type ButtonType = typeof possibleButtonTypes[number];
