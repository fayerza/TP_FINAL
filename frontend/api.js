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

export async function getOneRegion(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/regions/${id}`);
    if (!res.ok) {
      throw new Error('Failed to get a Region');
    }
    const data = await res.json();
    console.log('data');
    return data;
  } catch (error) {
    console.error('Error fetching region:', error);
    throw error;
  }
}

export async function deleteRelationship(idRegion, idMonster) {
  try {
    if (!idRegion || !idMonster) {
      throw new Error('The monster or Region id is needed');
    }
    const res = await fetch(`${BACKEND_URL}/monsters_regions/${idRegion}/${idMonster}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete relationship');
    }
    return res.status === 204;
  } catch (error) {
    console.error('Error deleting relationship:', error);
    throw error;
  }
}

export async function createRelationship(idRegion, idMonster) {
  try {
    if (!idRegion || !idMonster) {
      throw new Error('The monster or Region id is needed');
    }
    const res = await fetch(`${BACKEND_URL}/monsters_regions/${idRegion}/${idMonster}`, {
      method: 'POST',
    });
    if (!res.ok) {
      throw new Error('Failed to create relationship');
    }
    return res.status === 201;
  } catch (error) {
    console.error('Error creating relationship:', error);
    throw error;
  }
}