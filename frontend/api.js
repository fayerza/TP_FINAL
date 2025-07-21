const BACKEND_URL = process.env.BACKEND_URL

export async function getMonsters() {
  const res = await fetch(`${BACKEND_URL}/monsters`)
  if (!res.ok) {
    throw new Error('Failed to fetch monsters');
  }
  const data = await res.json();
  return data;
}