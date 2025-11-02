/**
 * Generate a unique ID
 */
let idCounter = 0;

export function generateId(): string {
  return `${Date.now()}-${idCounter++}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

