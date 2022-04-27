import { getElemAttrVal } from '@/global/tools/modules/dom';

const vDrap = {
  bind(el, { value = true }, vnode) {
    if (!value) return;
    const box = el.children[0];       // 获取容器元素
    const boxHead = box.children[0];  // 获取头部元素
    box.style.top = 0;
    boxHead.style.cursor = 'move';

    boxHead.onmousedown = (e) => {
      // 当鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - boxHead.offsetLeft;
      const disY = e.clientY - boxHead.offsetTop;

      // 获取 容器元素宽度 与 头部元素高度 (包含垂直内边距和边框,且为整数)
      const boxWidth = box.offsetWidth;
      const boxHeadHeight = boxHead.offsetHeight;

      // 获取窗口的宽高
      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;

      // 获取初始偏移量
      const minBoxLeft = box.offsetLeft;
      const maxBoxLeft = screenWidth - box.offsetLeft - boxWidth;
      const minBoxTop = box.offsetTop;
      const maxBoxTop = screenHeight - box.offsetTop - boxHeadHeight;

      let boxLeft = getElemAttrVal(box, 'left', false);
      let boxTop = getElemAttrVal(box, 'top', false);

      // 若获取单位为百分比，则转换为px
      if (boxLeft.includes('%')) {
        // eslint-disable-next-line no-useless-escape
        const resPercent = /\%/g;
        boxLeft = +document.body.clientWidth * (+boxLeft.replace(resPercent, '') / 100);
        boxTop = +document.body.clientHeight * (+boxTop.replace(resPercent, '') / 100);
      } else {
        // 获取到的值带px 正则匹配替换
        // eslint-disable-next-line no-useless-escape
        const resPx = /\px/g;
        boxLeft = +boxLeft.replace(resPx, '');
        boxTop = +boxTop.replace(resPx, '');
      }

      document.onmousemove = (e) => {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-(left) > minBoxLeft) {
          left = -minBoxLeft;
        } else if (left > maxBoxLeft) {
          left = maxBoxLeft;
        }

        if (-(top) > minBoxTop) {
          top = -minBoxTop;
        } else if (top > maxBoxTop) {
          top = maxBoxTop;
        }

        // 移动当前元素
        box.style.top = `${top + boxTop}px`;
        box.style.left = `${left + boxLeft}px`;

        // emit onDrag event
        vnode.child.$emit('dragDialog');
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
  update(el, { value = true }, vnode) {
    if (value) {
      vDrap.bind(el, value, vnode);
    } else {
      const box = el.children[0];       // 获取容器元素
      const boxHead = box.children[0];  // 获取头部元素

      // 重置样式
      boxHead.style.cursor = 'default';
      box.style.top = 0;
      box.style.left = 0;

      // 解绑事件
      boxHead.onmousedown = null;
    }
  },
};

export default vDrap;
