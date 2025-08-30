export function validateEmail(value: string): string | undefined {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) return "Некоректний email";
}

export function validatePassword(value: string): string | undefined {
  const ok = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(value);
  if (!ok) return "Пароль: ≥6 символів, 1 велика, 1 мала, 1 спецсимвол";
}
