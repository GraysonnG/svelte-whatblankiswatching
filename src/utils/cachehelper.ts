import { isFuture, isPast } from "date-fns";

export interface CachedItem {
  expire: Date;
}

export async function getStoredValue<T extends CachedItem>(
  value: string,
  onValueNotFound: () => Promise<T>
): Promise<T> {
  const storageValue = localStorage.getItem(value);
  let storage = !!storageValue ? JSON.parse(storageValue) : false;
  const expireDate = !!storage ? new Date(storage?.expire) : false;

  if (storage && expireDate && isFuture(expireDate)) {
    return storage;
  } else {
    storage = await onValueNotFound();
    localStorage.setItem(value, JSON.stringify(storage));
    return storage;
  }
}

export function getStoredValueUnsafe<T extends CachedItem>(
  value: string
): T | null {
  if (storedValueExists(value)) {
    return JSON.parse(localStorage.getItem(value)) as T
  } else return null;
}

export function storedValueExists(value: string): Boolean {
  return !!localStorage.getItem(value);
}

export function storedValueExpired(value: string): Boolean {
  if (storedValueExists(value)) {
    const storedString = localStorage.getItem(value);
    const storedValue = JSON.parse(storedString) as CachedItem;
    const expireDate = new Date(storedValue.expire);
    return isPast(expireDate);
  }
  return true;
}
