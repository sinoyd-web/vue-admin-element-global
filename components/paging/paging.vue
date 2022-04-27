<!-- 分页查询
<pager-query :pager=[分页对象] @query=[列表查询方法] />
-->

<template>
  <div class="mod-paging fn-clear">
    <el-pagination
      small
      background
      class="fn-right"
      layout="total, sizes, prev, pager, next, jumper"
      :pager-count="7"
      :page-sizes="[10, 15, 30, 50]"
      :total="data[props.total]"
      :page-size="data[props.rows]"
      :current-page.sync="data[props.page]"
      @size-change="onChangeSize"
      @current-change="onChangePage">
    </el-pagination>
    <button v-if="refresh" class="btn-refresh fn-right" title="刷新" @click="query()">
      <template v-if="typeof refresh === 'boolean'">
        <i class="el-icon-refresh"></i>
      </template>
      <template v-else-if="typeof refresh === 'number'">
        <i class="el-icon-time"></i>
        <span>{{ formatTime(countDown) }}</span>
      </template>
    </button>
  </div>
</template>

<script>
import config from '@/config';

export default {
  name: 'Paging',
  // 设置绑定参数
  model: {
    prop: 'data',
    event: 'setData',
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    refresh: {
      type: [Boolean, Number],
    },
    props: {
      type: Object,
      required: false,
      default: () => (config.pager),
    },
  },
  computed: {
    total() {
      return this.data[this.props.total] || 0;
    },
    // 检测获取到的数据是否为空
    isEmptyList() {
      return Math.ceil(this.data[this.props.total] / this.data[this.props.rows]) < this.data[this.props.page];
    },
  },
  data() {
    return {
      countDown: this.refresh,
      timer: () => {},
    };
  },
  watch: {
    total() {
      // 存在记录但未获取到数据时, 重新请求
      if (this.data[this.props.page] > 1 && this.isEmptyList) {
        this.$emit('setData', Object.assign(this.data, {
          [this.props.page]: this.data[this.props.page] - 1,
        }));
        this.query();
      }
    },
    countDown() {
      return this.countDown === 0 && this.query();
    },
  },
  created() {
    if (typeof refresh === 'number' && this.refresh) {
      this.timer = setInterval(() => this.countDown > 0 && this.countDown--, 1000);
    }
  },
  methods: {
    // 触发查询事件并重置计时
    query() {
      this.$emit('query');
      if (typeof refresh === 'number' && this.refresh) {
        this.countDown = this.refresh;
        clearInterval(this.timer);
        this.timer = setInterval(() => this.countDown > 0 && this.countDown--, 1000);
      }
    },
    // 每页条数
    onChangeSize(rows) {
      this.$emit('size-change', rows);
      const temp = {
        [this.props.rows]: rows,
        // 当显示条数小于或等于总条数时，重置页数
        [this.props.page]: rows <= this.total ? 1 : this.data[this.props.page],
      };

      this.$emit('setData', Object.assign(this.data, temp));
      // 触发父组件查询请求
      this.query();
    },
    // 翻页
    onChangePage(page) {
      this.$emit('current-change', page);
      this.$emit('setData', Object.assign(this.data, { [this.props.page]: page }));
      this.query();
    },
    // 转换时间格式
    formatTime(t) {
      const s = t % 60;
      return `${Math.floor(t / 60)}:${s < 10 ? `0${s}` : s}`;
    },
  },
};
</script>
