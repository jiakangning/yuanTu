<template>
  <el-select
    class="run-select"
    :multiple="multiple"
    :value-key="valueKey"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="currentValue">
    <template v-if="multiple">
      <div
        class="run-select-all"
        @click="onSelect">
        <span>全选</span>
        <el-checkbox
          @click.native.stop
          :value="isCheckAll"
          :indeterminate="isIndeterminate"
          @change="onChange"/>
      </div>
      <div class="run-select-wrap">
        <run-option
          v-for="(item, index) in source"
          :label="getLabel(item)"
          :value="getValue(item)"
          :key="index"/>
      </div>
    </template>
    <template v-else>
      <run-option
        v-for="(item, index) in source"
        :label="getLabel(item)"
        :value="getValue(item)"
        :key="index"/>
    </template>
  </el-select>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: "run-select",
    props: {
      multiple: {},
      label: {},
      source: {
        default: () => []
      },
      value: {},
      valueKey: {},
      valueCode: {}
    },
    computed: {
      currentValue: {
        get() {
          if (!this.multiple) return this.value
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      isIndeterminate() {
        if (!this.multiple) return false
        if (this.currentValue.length === 0) return false
        return this.currentValue.length !== this.source.length
      },
      isCheckAll() {
        if (!this.multiple) return false
        return this.currentValue.length === this.source.length
      }
    },
    methods: {
      getValue(obj) {
        return this.valueKey ? obj : _.get(obj, this.valueCode)
      },
      getLabel(obj) {
        return typeof this.label === "function" ? this.label.call(this, obj) : _.get(obj, this.label)
      },
      onSelect() {
        this.onChange(!this.isCheckAll)
      },
      onChange(val) {
        let source = this.source.map(item => this.valueKey ? item : _.get(item, this.valueCode))
        this.currentValue = val ? source : []
      }
    }
  }
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .run-select
    width: 100%

    &-wrap
      position: relative
      max-height: 256px
      overflow: auto
      padding-top: 40px
      box-sizing: border-box
      user-select: none

    &-all
      position: absolute
      top: 0
      left: 0
      right: 0
      line-height: 34px
      font-size: 14px
      margin: 0 20px
      background-color: #ffffff
      border-bottom: 1px solid #e4e7ed
      z-index: 10
      display: flex
      justify-content: space-between
      padding-top: 4px
      color: #606060
      font-weight: bold
      cursor: pointer
      user-select: none

</style>
