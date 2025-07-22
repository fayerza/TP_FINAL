const BACKEND_URL = 'http://localhost:5000/api/v1';

export async function getMonsters() {
  try {
    const res = await fetch(`${BACKEND_URL}/monsters`);
    if (!res.ok) {
      throw new Error('Failed to fetch monsters');
    }
    const data = await res.json();
    console.log('data')
    return data;
  } catch (error) {
    console.error('Error fetching monsters:', error);
    throw error;
  }
}