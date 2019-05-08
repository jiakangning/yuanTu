<template>
  <div class="page">
    <div class="wrap">
      <el-button
        @click="onOpen">打开搜索弹框
      </el-button>
      <run-popup-search
        v-model="show"
        :options="options"/>
    </div>
  </div>
</template>

<script>
  import Run from 'run'

  export default {
    data() {
      return {
        show: false,
        options: null,
        sources: new Run.Source()
      }
    },
    created() {
      this.options = new Run.PopupSearch({
        columns: [
          { field: "category", layout: "select", label: "检查形式", source: "category" },
          { field: "time", layout: "time" }
        ],
        sources: this.sources
      })
      this.sources.set("category", [
        { label: "基础检查", value: 1 },
        { label: "安全大检查", value: 2 },
        { label: "榆北煤业", value: 3 },
        { label: "上级领导检查", value: 4 }
      ])
    },
    methods: {
      onOpen() {
        this.show = true
      }
    }
  }
</script>

<style scoped>
.page {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.wrap {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
</style>