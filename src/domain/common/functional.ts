export function xprod(arr1: any[], arr2: any[]): any[][] {
  return arr1
    .map((element1) => {
      return arr2.map((element2) => {
        return [element1, element2];
      });
    })
    .flat();
}
