import { BaseOptionModel, BaseOptionModelWithPosKey } from './type';

/**
 * DFS 构建 posKey，posKey=a-b-c-d
 * @param arr
 * @param prefix
 * @returns
 */
function genPosKey<T extends BaseOptionModel>(
  arr: T[],
  prefix = '',
): BaseOptionModelWithPosKey[] {
  return arr.map((v) => {
    const posKey = !!prefix ? `${prefix}-${v.value}` : v.value;

    if (v.children && v.children.length) {
      v.children = genPosKey(v.children, posKey);
    }

    return {
      ...v,
      posKey: posKey,
    } as BaseOptionModelWithPosKey;
  });
}

/**
 * a-b-c => [a, b, c]
 * @param pos
 * @returns
 */
function posToArr(pos: string): string[] {
  return pos.split('-');
}

/**
 * [a, b, c] => a-b-c
 * @param arr
 * @returns
 */
function arrToPos(arr: string[]): string {
  return arr.join('-');
}

/**
 * DFS 构建 keyEntities
 * @param arr
 * @param map
 * @param onlyLeaf
 */
function buildKeyEntities<T extends BaseOptionModel>(
  map: Map<string, T>,
  arr: T[],
  onlyLeaf?: boolean,
) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!element.children) {
      map.set(element.value, element);
    } else {
      if (!onlyLeaf) {
        map.set(element.value, element);
      }
      buildKeyEntities(map, element.children as T[]);
    }
  }
  return map;
}

/**
 * DFS 构建 levelEntities
 * @param map
 * @param data
 * @param level
 * @returns
 */
function buildLevelEntities<T extends BaseOptionModel>(
  map = new Map<number, Set<T>>(),
  data: T[] = [],
  level = 0,
) {
  if (!map.has(level)) {
    map.set(level, new Set<T>());
  }
  data.forEach((element) => {
    const set = map.get(level);
    if (set) {
      set.add(element);
    }
    if (element.children && element.children.length) {
      buildLevelEntities(map, element.children, level + 1);
    }
  });
  return map;
}

export { genPosKey, posToArr, arrToPos, buildKeyEntities, buildLevelEntities };
