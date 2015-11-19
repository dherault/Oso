export default function isClient() {
  return typeof window !== 'undefined' && typeof window.location !== 'undefined';
}

export function isServer() {
  return !isClient();
}
