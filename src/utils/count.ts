export function count (value: number, unit: string = '万') {
  if (!value) return
  const str = value.toString();
  if (str.length > 4) {
    return str.slice(0, str.length - 4) + unit;
  } else {
    return value + '次';
  }
}