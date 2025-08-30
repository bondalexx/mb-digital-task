export function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function load<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
