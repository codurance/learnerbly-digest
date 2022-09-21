export function isDate(date: string): boolean {
  return /"\w+ [0-9]{1,2}, [0-9]{4}"/g.test(date);
}
