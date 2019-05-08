<template>
  <div style="padding: 20px">
    <el-button type="primary" icon="el-icon-plus" size="small" @click="onAddCol">添加</el-button>
    <el-table :data="data" fit highlight-current-row style="width: 100%" ref="dataTable" class="dataTable">
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="颜色" align="center" v-if="dataOption.type === 'shuntTypes'">
         <template slot-scope="scope">
           <el-color-picker size="small" v-model="scope.row.value"></el-color-picker>
        </template>
      </el-table-column>
      <el-table-column label="阻力系数kg/m2" align="center" v-if="dataOption.type === 'frictions'">
        <template slot-scope="scope">
          <el-input size="small" type="number" v-model="scope.row.value"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="风阻Ns2/m8" align="center" v-if="dataOption.type === 'windResistances'">
        <template slot-scope="scope">
          <el-input size="small" type="number" v-model="scope.row.value"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="反向风阻" align="center" v-if="dataOption.type === 'windResistances'">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.fWindR"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="解释" align="center" v-if="dataOption.type === 'windResistances'">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.remark"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="60">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="onRmCol(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row
      class="dataButton is-right">
      <el-button
        @click="onCancel">关闭
      </el-button>
      <el-button
        @click="onSubmit"
        :loading="loading"
        type="primary">提交
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    dataOption: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      data: []
    }
  },
  mounted() {
    this.data = [].concat(this.dataOption.data)
  },
  methods: {
    // 添加
    onAddCol () {
      this.data.push({
        name: '',
        value: '',
        fWindR: '',
        remark: ''
      })
    },
    // 删除
    onRmCol (item) {
      this.data.forEach((r, index) => {
        if (this.data[index] === item) {
          this.$confirm('将要移除项？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.data.splice(index, 1)
          }).catch(() => { })
        }
      })
    },
    // 关闭
    onCancel() {
      this.$emit('close')
    },
    // 提交
    onSubmit() {
      this.$emit('submit', this.dataOption.type, this.data)
    }
  }
}
</script>

<style lang="less">
.dataTable {
  margin-bottom: 40px;
  overflow: auto;
}
.dataButton {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  padding: 10px;
  border-top: 1px solid #eee;
  text-align: right;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
</style>
