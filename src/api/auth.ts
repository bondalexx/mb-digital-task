import { validateEmail, validatePassword } from "../utils/valid";
import type { User } from "../types";

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function login(email: string, password: string): Promise<User> {
  await delay(400);
  const e = validateEmail(email);
  const p = validatePassword(password);
  if (e) throw new Error(e);
  if (p) throw new Error(p);
  return { email };
}

export async function register(email: string, password: string): Promise<User> {
  await delay(600);
  const e = validateEmail(email);
  const p = validatePassword(password);
  if (e) throw new Error(e);
  if (p) throw new Error(p);
  return { email };
}
