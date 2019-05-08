<template>
  <!-- 风路解算信息 -->
  <el-table :data="data" style="width: 100%">
    <el-table-column type="index" width="100"></el-table-column>
    <el-table-column prop="a" label="风路名称" min-width="100"></el-table-column>
    <el-table-column prop="b" label="风路通风类型" width="120"></el-table-column>
    <el-table-column prop="c" label="风路起点名称" width="120"></el-table-column>
    <el-table-column prop="d" label="风路终点名称" width="120"></el-table-column>
    <el-table-column prop="e" label="初始风量" width="100"></el-table-column>
    <el-table-column prop="f" label="风路风阻" width="100"></el-table-column>
    <el-table-column prop="g" label="风阻计算方式" width="120"></el-table-column>
    <el-table-column prop="h" label="是否有构筑物" width="120"></el-table-column>
    <el-table-column prop="i" label="构筑物风阻" width="120"></el-table-column>
    <el-table-column prop="j" label="测量风量" width="100"></el-table-column>
    <el-table-column prop="k" label="解算风量" width="100"></el-table-column>
    <el-table-column prop="l" label="解算风压" width="100"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>

</style>
