/**
 * Save a value to localStorage under a specified key.
 * @param {string} key - The key under which to store the value
 * @param {any} value - The value to store, which will be stringified
 */
export function setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * Retrieve a value from localStorage by key.
   * @param {string} key - The key of the item to retrieve
   * @returns {any | null} - The parsed value, or null if the key doesn't exist
   */
  export function getItem(key: string): any | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  