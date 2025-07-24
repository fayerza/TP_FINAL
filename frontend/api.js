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

export async function getOneMonster(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/monsters/${id}`);
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

export async function createMonster(monster) {
  try {
    if (!monster) {
      throw new Error('Monster data is required');
    }
    const res = await fetch(`${BACKEND_URL}/monsters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: monster,
    });
    if (!res.ok) {
      throw new Error('Failed to create monster');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating monster:', error);
    throw error;
  }
}

export async function updateMonster(id, monster) {
  try {
    if (!id || !monster) {
      throw new Error('Monster ID and data are required');
    }
    const res = await fetch(`${BACKEND_URL}/monsters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: monster,
    });
    if (!res.ok) {
      throw new Error('Failed to update monster');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating monster:', error);
    throw error;
  }
}

export async function deleteMonster(id) {
  try {
    if (!id) {
      throw new Error('Monster ID is required');
    }
    const res = await fetch(`${BACKEND_URL}/monsters/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete monster');
    }
    return res.status === 204;
  } catch (error) {
    console.error('Error deleting monster:', error);
    throw error;
  }
}

export async function getOneMonsterAttack(id, attackId) {
  try {
    if (!id || !attackId) {
      throw new Error('Monster ID and Attack ID are required');
    }
    const res = await fetch(`${BACKEND_URL}/monsters/${id}/attacks/${attackId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch monster attack');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching monster attack:', error);
    throw error;
  }
}


export async function createMonsterAttack(id, attack) {
  try {
    if (!id || !attack) {
      throw new Error('Monster ID and Attack data are required');
    }

    console.log(" createMonsterAttack called with id:", id, "attack:", attack);
    const res = await fetch(`${BACKEND_URL}/monsters/${id}/attacks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attack),
    });
    if (!res.ok) {
      throw new Error('Failed to create monster attack');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating monster attack:', error);
    throw error;
  }
}
export async function updateMonsterAttack(id, attackId, attack) {
  try {
    if (!id || !attackId || !attack) {
      throw new Error('Monster ID, Attack ID, and Attack data are required');
    }
    console.log(" updateMonsterAttack called with id:", id, "attackId:", attackId, "attack:", attack);
    const res = await fetch(`${BACKEND_URL}/monsters/${id}/attacks/${attackId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: attack,
    });
    if (!res.ok) {
      throw new Error('Failed to update monster attack');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating monster attack:', error);
    throw error;
  }
}

export async function deleteMonsterAttack(id, attackId) {
  try {
    if (!id || !attackId) {
      throw new Error('Monster ID and Attack ID are required');
    }
    const res = await fetch(`${BACKEND_URL}/monsters/${id}/attacks/${attackId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete monster attack');
    }
    return res.status === 204;
  } catch (error) {
    console.error('Error deleting monster attack:', error);
    throw error;
  }
}