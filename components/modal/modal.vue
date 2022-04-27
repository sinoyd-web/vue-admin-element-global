<template>
  <el-dialog
    ref="dialog"
    v-if="showDialog"
    v-drag="drag && !fullScreen"
    :width="width[size]"
    :fullscreen="size === 'full' || isFullscreen"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :before-close="beforeClose"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="closed">
    <template slot="title">
      <span class="el-dialog__title">
        <i class="icon icon-dialog mar-r-xs"></i>
        <span><slot name="title">{{ title }}</slot></span>
      </span>
      <button
        v-if="size === 'large'"
        class="el-dialog__headerbtn"
        type="button"
        :title="isFullscreen ? '还原' : '最大化'"
        @click="isFullscreen = !isFullscreen">
        <i :class="`icon icon-${isFullscreen ? 'screen-restore' : 'screen-full'}`"></i>
      </button>
    </template>
    <slot></slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // Dialog 的标题，也可通过具名 slot 传入
    title: {
      type: String,
      default: '',
    },
    // 弹框大小 mini: 30%, small:50%, large:80%, full:100%
    size: {
      type: String,
      default: 'small',
      // 验证合法尺寸字符串
      validator: value => ['mini', 'small', 'middle', 'large', 'full'].indexOf(value) !== -1,
    },
    // 遮罩层是否插入至 body 元素上
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    // Dialog 自身是否插入至 body 元素上
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true,
    },
    // Dialog 的自定义类名
    customClass: {
      type: String,
      default: '',
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeClose: {
      type: Function,
      default: (done) => { done(); },
    },
  },
  data() {
    return {
      dialogVisible: false,
      showDialog: false,
      isFullscreen: false,
      width: {
        mini: '30%',
        small: '50%',
        middle: '65%',
        large: '80%',
        full: '100%',
      },
    };
  },
  watch: {
    isFullscreen(val) {
      this.setRepStyle(val);
    },
  },
  methods: {
    // 打开对话框
    open() {
      this.showDialog = true;
      this.dialogVisible = true;
      this.isFullscreen = false;
      this.setRepStyle(this.isFullscreen);
    },
    // 关闭对话框
    close() {
      this.dialogVisible = false;
    },
    // 关闭前回调（动画结束）
    closed() {
      this.$emit('closed');
      this.showDialog = false;
    },
    // 设置响应样式
    setRepStyle(val) {
      const bodyHeight = {
        'mini': '15vh auto auto',
        'small': '15vh auto auto',
        'middle': '7vh auto',
        'large': '7vh auto',
        'full': '0',
      };
      this.$nextTick(() => {
        const el = this.$refs.dialog.$refs.dialog;
        const els = this.$refs.dialog.$refs.dialog.children;
        const elHead = els[0].getBoundingClientRect().height;
        const elFoot = els[2] ? els[2].getBoundingClientRect().height : 0;
        el.style.margin = bodyHeight[this.size];
        if (['large', 'middle'].includes(this.size)) {
          els[1].style.height = `calc(${val ? '100%' : '86vh'} - ${elHead + elFoot}px)`;
        }
        els[1].style.maxHeight = this.size === 'small' ? `calc(85vh - ${elHead + elFoot}px)` : 'auto';
      });
    },
  },
};
</script>
