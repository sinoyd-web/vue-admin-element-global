/* 元素宽度可调整 v-resize
使用限制：
  1. v-resize 仅适用于 el-row 元素标签
  2. el-row 的子元素是 el-col 元素标签
*/

import Vue from 'vue';

// 配置参数定义
const minWidth = 200;                     // 最小保留宽度(像素)
const lineClassName = 'drag-resize-line'; // 分隔线类样式
const noSelectClassName = 'fn-no-select'; // 禁选文字样式

/**
 * @description 事件委托
 * @param {Element} parentEl 父元素
 * @param {String} childClassName 子元素类名
 * @returns {Function} callback 回调事件
 * @returns {String} type 事件类型
 */
const onChild = (parentEl, childClassName, callback, type = 'mousedown') => {
  parentEl.addEventListener(type, (e) => {
    if (e.srcElement.className !== childClassName) {
      return null;
    }
    return callback(e);
  });
};

export default {
  bind(el) {
    // 缓存用到的元素
    const box = el; // 容器元素
    const body = document.getElementsByTagName('body')[0];

    /* eslint-disable no-param-reassign */
    // args1：主元素; args: 响应元素
    const onResizeEvent = (colL, colR) => {
      // 动态生成分隔线元素
      colL.style.position = 'relative';
      colL.appendChild(Vue.$tools.createElem(lineClassName, 'span'));

      // 给分隔线元素绑定事件
      onChild(colL, lineClassName, (e) => {
        const me = e.target;

        let offset = 0;                               // 动态偏移量
        const baseOffset = e.clientX;                 // 获取基础偏移量
        const boxWidth = Vue.$tools.getElemAttrVal(box, 'width');         // 获取容器宽度
        const leftWidth = Vue.$tools.getElemAttrVal(colL, 'width');       // 获取主元素(左)原始宽度
        const rightWidth = Vue.$tools.getElemAttrVal(colR, 'width');      // 获取响应元素(右)原始宽度
        const leftMaxOffset = leftWidth - minWidth;   // 主元素最大偏移量
        const rightMaxOffset = rightWidth - minWidth; // 响应元素最大偏移量

        // 添加状态样式
        me.classList.add('hover');
        body.classList.add(noSelectClassName);

        // 绑定鼠标移动事件
        body.onmousemove = (event) => {
          offset = event.clientX - baseOffset;

          // 不允许超出最大偏移量
          if (offset > -leftMaxOffset && offset < rightMaxOffset) {
            me.style.right = `${-offset}px`;
          }
        };

        // 绑定鼠标弹起事件
        body.onmouseup = () => {
          // 若超出最大偏移量，则忽略超出部分，设置为最大偏移量
          if (offset <= -leftMaxOffset || offset >= rightMaxOffset) {
            offset = offset > 0 ? rightMaxOffset : -leftMaxOffset;
          }

          // 设置元素宽度(适应响应布局需使用百分比单位)
          colL.style.width = `${(leftWidth + offset) / boxWidth * 100}%`;
          colR.style.width = `${(rightWidth - offset) / boxWidth * 100}%`;

          // 移除状态样式
          me.classList.remove('hover');
          body.classList.remove(noSelectClassName);

          // 还原分隔线位置
          me.style.right = '-5px';
          // 解绑鼠标移动事件
          body.onmousemove = null;
        };
      }, 'mousedown');
    };

    // 循环给子元素绑定事件
    for (let i = 0; i < box.children.length - 1; i++) {
      onResizeEvent(box.children[i], box.children[i + 1]);
    }
  },
};
