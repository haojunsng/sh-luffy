export const Map: { pattern: RegExp; fallback: string }[] = [
  { pattern: /^\/blog\/.+$/, fallback: '/blog' },
  { pattern: /^\/blog$/, fallback: '/' },
  { pattern: /^\/projects$/, fallback: '/' },
  { pattern: /^\/about$/, fallback: '/' },
  { pattern: /^\/contact$/, fallback: '/' },
  { pattern: /^\/relax$/, fallback: '/' },
  { pattern: /.*/, fallback: '/' },
]
