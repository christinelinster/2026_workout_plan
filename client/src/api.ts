import type { Program } from '../../server/types';

export async function fetchProgram(): Promise<Program> {
  const res = await fetch('/api/program');
  if (!res.ok) {
    throw new Error(`Failed to load program: ${res.status}`);
  }
  return res.json();
}
