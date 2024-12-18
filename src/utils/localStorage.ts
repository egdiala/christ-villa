/**
 * Gets an item from the browsers localStorage
 * @param storageKey - String for the item key
 * @returns The item from localStorage
 */
export function getItem<T>(storageKey: string) {
    return localStorage.getItem(storageKey) as T
}

/**
 * Sets an item to the browsers localStorage
 * @param key - Key for the item
 * @param value - Value to be set
 * @returns 
 */
export function setItem(key: string, value: any) {
    return localStorage.setItem(key, value)
}


export function removeItem(key: string) {
    return localStorage.removeItem(key)
}