// Local storage based sharing service (no backend needed)
const STORAGE_KEY = "fwt_shares";

export interface ShareItem {
  id: string;
  type: "url" | "text" | "image" | "file";
  content: string; // URL, text, or base64 data
  fileName?: string;
  mimeType?: string;
  createdAt: number;
  views: number;
}

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function getAll(): Record<string, ShareItem> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAll(items: Record<string, ShareItem>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function createShare(type: ShareItem["type"], content: string, fileName?: string, mimeType?: string): string {
  const items = getAll();
  let id = generateId();
  while (items[id]) id = generateId();
  items[id] = { id, type, content, fileName, mimeType, createdAt: Date.now(), views: 0 };
  saveAll(items);
  return id;
}

export function getShare(id: string): ShareItem | null {
  const items = getAll();
  const item = items[id];
  if (!item) return null;
  item.views++;
  saveAll(items);
  return item;
}

export function getAllShares(): ShareItem[] {
  return Object.values(getAll()).sort((a, b) => b.createdAt - a.createdAt);
}

export function deleteShare(id: string) {
  const items = getAll();
  delete items[id];
  saveAll(items);
}
