export type ApiUser = {
  id: number;
  email: string;
  name: string | null;
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";

async function requestJson<T>(
  path: string,
  init: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    credentials: "include",
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && typeof (data as any).error === "string"
        ? (data as any).error
        : undefined) ?? `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}

export async function me(): Promise<ApiUser | null> {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as any) : null;

  if (!res.ok) return null;
  return (data?.user ?? null) as ApiUser | null;
}

export async function login(email: string, password: string): Promise<ApiUser> {
  const data = await requestJson<{ user: ApiUser }>(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return data.user;
}

export async function signup(name: string, email: string, password: string): Promise<ApiUser> {
  const data = await requestJson<{ user: ApiUser }>(`/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return data.user;
}

export async function logout(): Promise<void> {
  await requestJson<{ ok: boolean }>(`/api/auth/logout`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

