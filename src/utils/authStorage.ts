const STORAGE_KEY = 'form-builder-auth-user';

export function getStoredUsername(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function storeUsername(username: string): void {
  localStorage.setItem(STORAGE_KEY, username);
}

export function clearStoredUsername(): void {
  localStorage.removeItem(STORAGE_KEY);
}
