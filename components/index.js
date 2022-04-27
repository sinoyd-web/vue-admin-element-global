// 注册全局组件，无需引入，直接使用

import Modal from './modal';
import ContentMenu from './content-menu';
import Paging from './paging';

const components = {
  Modal,        // 对话框
  ContentMenu,  // 右键菜单
  Paging,       // 分页查询
};

const install = (Vue) => {
  // 注册全局组件
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });
};

export default { install, ...components };
