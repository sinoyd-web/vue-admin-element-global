// 事件方法

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = () => {
  if (document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return (element, event, handler) => {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
};

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = () => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return (element, event, handler) => {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
};

/**
 * @description 事件委托
 * @param {Element} parentEl 父元素
 * @param {String} childClassName 子元素类名
 * @returns {Function} callback 回调事件
 * @returns {String} type 事件类型
 */
export const onChild = (parentEl, childClassName, callback, type = 'mousedown') => {
  parentEl.addEventListener(type, (e) => {
    if (e.srcElement.className !== childClassName) {
      return null;
    }
    return callback(e);
  });
};
