import type { Program } from '../../server/types';

export async function fetchProgram(): Promise<Program> {
  if (import.meta.env.MODE === 'pages') {
    const { program } = await import('../../server/data/program');
    return program;
  }

  const res = await fetch('/api/program');
  if (!res.ok) {
    throw new Error(`Failed to load program: ${res.status}`);
  }
  return res.json();
}
