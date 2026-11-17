// api.js - the only place that talks to Express. No direct database access here.
const BASE_URL = '/api'

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    // fetch throws a TypeError when the server is stopped or unreachable.
    throw new Error('Cannot reach the server. Check that the Express server is running, then try again.')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}.`)
  }
  return data
}

export const taskApi = {
  list: () => request('/tasks'),
  create: (title) => request('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
  rename: (id, title) => request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ title }) }),
  setCompleted: (id, completed) =>
    request(`/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ completed }) }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
}
