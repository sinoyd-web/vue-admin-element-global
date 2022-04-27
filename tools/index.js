/* eslint-disable no-unused-vars */

import {
  createElem,
  getElemAttrVal,
  setCursorPosition,
} from './modules/dom';

import {
  on,
  off,
  onChild,
} from './modules/event';

import {
  getDate,
  getRelativeTime,
  formatDate,
  computeDate,
  date,
} from './modules/time';

import {
  getExplorer,
  getType,
  getIntersection,
  getUnion,
  hasOneOf,
  getFleSuffix,
  classify,
  hyphenate,
  camelize,
} from './modules/data';

export default {
  createElem,         // 生成元素
  getElemAttrVal,     // 获取元素属性值
  setCursorPosition,  // 设置输入域(input/textarea)光标的位置

  on,                 // 绑定事件 on(element, event, handler)
  off,                // 解绑事件 off(element, event, handler)
  onChild,            // 事件委托

  getDate,
  getRelativeTime,
  formatDate,
  computeDate,
  date,

  getExplorer,        // 获取当前浏览器名称
  getType,            // 获取数据类型
  getIntersection,    // 获取两个数组的交集
  getUnion,           // 获取两个数组的并集
  hasOneOf,           // 判断要查询的数组是否至少有一个元素包含在目标数组中
  getFleSuffix,       // 获取文件后缀名
  classify,           // 将-、_、/ 的命名转为驼峰式命名
  hyphenate,          // 将驼峰式命名转换为-
  camelize,           // 将-命名方式转换为驼峰式
};
