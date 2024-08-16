type KeyType = string | number | symbol;

type PathKeys<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? K | `${K}.${PathKeys<T[K]>}`
        : K;
    }[keyof T & (string | number)]
  : never;

type NestedKeyArr<T> = T extends infer K
  ? K extends object
    ? PathKeys<K>
    : never
  : never;

function getNestedProperty<T>(obj: T, path: string): any {
  return path.split(".").reduce((acc: any, part) => {
    return typeof acc === "object" && acc !== null ? acc[part] : undefined;
  }, obj);
}

export function groupBy<T>(
  array: T[],
  keyPath: NestedKeyArr<T>
): Record<KeyType, T[]> {
  const result: Record<KeyType, T[]> = {};
  array.forEach((item) => {
    const keyValue = getNestedProperty(item, keyPath);
    if (!result[keyValue]) {
      result[keyValue] = [];
    }
    result[keyValue].push(item);
  });
  return result;
}
