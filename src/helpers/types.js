export function getType(value) {
  return (typeof value);
}

export function typeIs(value, type) {
  return (typeof value) === type;
}

export function isObject(value) {
  return ((typeof value) === 'object') && !Array.isArray(value);
}

export function isArray(value) {
  return ((typeof value) === 'object') && Array.isArray(value);
}
