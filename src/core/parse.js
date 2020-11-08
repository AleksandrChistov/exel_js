export function parse(value = '') {
  if (value.startsWith('=') && value !== '=') {
    try {
      return eval(value.split('=')[1]);
    } catch {
      return value;
    }
  }
  return value;
}
