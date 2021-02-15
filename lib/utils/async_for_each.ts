export default async function asyncForEach<T>(array: Array<T>, callback: (element: T, index: number, array: Array<T>) => void ) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
