/* ============================================================
   CONFIG — paste your deployed Apps Script Web App URL here
   (same backend the admin dashboard uses)
   ============================================================ */
export const API_BASE_URL = "https://script.google.com/macros/s/AKfycbw52bCy9DjDhG6RkGVbVhPEtkVZHd_vuVfPQTTr7U1EhLkx6PYXkFi7Jdc5vrw7nG90/exec";

export const DEMO = API_BASE_URL.startsWith("PASTE_");

export async function apiGet(action, params = {}) {
  if (DEMO) return { success: false, demo: true };
  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${API_BASE_URL}?${query}`);
  return res.json();
}

export async function apiPost(action, data = {}) {
  if (DEMO) return { success: true, demo: true, data: { id: "demo" } };
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...data }),
  });
  return res.json();
}
