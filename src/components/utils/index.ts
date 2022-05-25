/**
 * 通过name查询items下标
 *
 * @param name 字段名
 * @param items 字段集合
 * @param fieldName 字段名称[默认name]
 */

function findIndexItems(name: string, items: any[], fieldName = 'name') {
  if (!name) {
    return -1;
  }
  if (!items) {
    return -1;
  }
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    if (element && element[fieldName] == name) {
      return index;
    }
  }
  return -1;
}

export { findIndexItems };
