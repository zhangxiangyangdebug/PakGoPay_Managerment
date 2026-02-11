export function saveDraft(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // ignore storage errors
  }
}

export function loadDraft(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function clearDraft(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // ignore storage errors
  }
}
