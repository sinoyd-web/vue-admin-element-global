<!-- 右键菜单 -->
<template>
  <ul v-show="visible" class="mod-menu-context" :style="{ left: `${left}px`, top: `${top}px`}">
    <slot :rows="scope.rows" :index="scope.index"></slot>
  </ul>
</template>

<script>
export default {
  name: 'ContextMenu',
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  data() {
    return {
      visible: false,  // 显示右键菜单
      top: 20,
      left: 20,
      scope: {
        rows: '',
        index: '',
      },
    };
  },
  methods: {
    openMenu(e, rows, index) {
      this.top = e.clientY;
      this.left = e.clientX;
      this.visible = true;
      this.scope = { rows, index };
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>
