const toUpper = v => v.toUpperCase();

/**
 * @description 获取当前浏览器名称
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = exp => ua.indexOf(exp) > -1;
  if (isExplorer('MSIE')) return 'IE';
  if (isExplorer('Firefox')) return 'Firefox';
  if (isExplorer('Chrome')) return 'Chrome';
  if (isExplorer('Opera')) return 'Opera';
  if (isExplorer('Safari')) return 'Safari';
  return false;
};

/**
 * @description 获取数据类型
 * @param {Any} data
 */
export const getType = data => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

/**
 * @description 获取两个数组的交集, 两个数组的元素为数值或字符串
 * @param {Array} arr1
 * @param {Array} arr2
 */
export const getIntersection = (arr1, arr2) => {
  const len = Math.min(arr1.length, arr2.length);
  const res = [];
  let i = -1;
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }
  return res;
};

/**
 * @description 获取两个数组的并集, 两个数组的元素为数值或字符串
 * @param {Array} arr1
 * @param {Array} arr2
 */
export const getUnion = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]));

/**
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 */
export const hasOneOf = (targetarr, arr) => targetarr.some(_ => arr.indexOf(_) > -1);

/**
 * @description 获取文件后缀名
 * @param {String} fileName
 */
export const getFleSuffix = (fileName) => {
  const indexed = fileName.lastIndexOf('.') + 1;
  return fileName.substring(indexed, fileName.length);
};

/**
 * @description 将-、_、/ 的命名转为驼峰式命名
 * @param {String} str 名称
 * @param {Boolean} isBig 是否转换为大驼峰
 */

export const classify = (str, isBig = true) => {
  // eslint-disable-next-line no-useless-escape
  const strTemp = str.replace(/(?:^|[-_\/])(\w)/g, toUpper).replace(/([-_\/])/g, '');
  return isBig ? strTemp : strTemp.substring(0, 1).toLowerCase() + strTemp.substring(1);
};

/**
 * @description 将驼峰式命名转换为-
 * @param {String} str
 */
export const hyphenate = str => str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @description 将-命名方式转换为驼峰式
 * @param {String} str 带转换字符串
 * @param {Boolean} isBig 是否转换为大驼峰
 */
export const camelize = (str, isBig) => {
  const strTemp = str.replace(/-(\w)/g, toUpper).replace(/-/g, '');
  return isBig ? strTemp.substring(0, 1).toUpperCase() + strTemp.substring(1) : strTemp;
};
