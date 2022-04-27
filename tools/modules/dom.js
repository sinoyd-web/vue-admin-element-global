// 操作 DOM 方法

/**
 * @description 生成元素
 */
export const createElem = (className, elType = 'div') => {
  const elem = document.createElement(elType);
  elem.classList.add(className);
  return elem;
};

/**
 * @description 获取元素属性值
 * @param {String} elem dom元素
 * @param {String} attrName 属性名称
 * @param {Boolean} isConvertNumbar 是否转化为数值
 */
export const getElemAttrVal = (elem, attrName = 'width', isConvertNumbar = true) => {
  const oStyle = elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem, null);
  let val = '';
  if (oStyle[attrName]) {
    val = oStyle[attrName];
  } else {
    val = oStyle.getPropertyValue ? oStyle.getPropertyValue(attrName) : oStyle.getAttribute(attrName);
  }
  return isConvertNumbar ? parseFloat(val) : val;
};

/**
 * @description 设置输入域(input/textarea)光标的位置
 * @param {HTMLInputElement/HTMLTextAreaElement} el // dom元素
 * @param {Number} index  // 光标位置
 */
export const setCursorPosition = (el, index) => {
  const val = el.value;
  const len = val.length;
  if (len < index) return; // 超过文本长度直接返回
  setTimeout(() => {
    el.focus();
    if (el.setSelectionRange) { // 标准浏览器
      el.setSelectionRange(index, index);
    } else { // IE9-
      const range = el.createTextRange();
      range.moveStart('character', -len);
      range.moveEnd('character', -len);
      range.moveStart('character', index);
      range.moveEnd('character', 0);
      range.select();
    }
  }, 10);
};
