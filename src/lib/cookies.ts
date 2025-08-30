// src/lib/cookies.ts
export function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
}

export function getCookie(name: string) {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}
