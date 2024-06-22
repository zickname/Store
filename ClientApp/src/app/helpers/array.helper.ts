export class ArrayHelper {
  public static arrayElementMove(
    array: any[],
    oldIndex: number,
    newIndex: number
  ): void {
    if (newIndex >= array.length) {
      let k: number = newIndex - array.length + 1;
      while (k--) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  }

  public static remove<T>(array: T[], element: T): void {
    const elementIndex: number = array.findIndex((x: T) => x === element);

    if (elementIndex !== -1) {
      array.splice(elementIndex, 1);
    }
  }
}
