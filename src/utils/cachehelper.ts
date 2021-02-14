import { isFuture } from 'date-fns'

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