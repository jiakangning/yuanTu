<template>
  <div class="widge-container">
    <div
      class="widge-item"
      v-for="(data, index) in source"
      :style="getStyle(index)"
      :key="index">
      <img
        class="widge-item-icon"
        :src="getValue(data, 'icon')">
      <p class="widge-item-total">
        {{ getValue(data, 'total') }}
      </p>
      <p class="widge-item-content">
        <span class="widge-item-name">
          {{ getValue(data, 'name') }}
        </span>
        <span class="widge-item-desc">
          {{ getValue(data, 'desc') }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  import Theme from '../theme'
  import _ from 'lodash'

  export default {
    props: {
      options: {},
      source: {}
    },
    methods: {
      getValue(item, field) {
        return _.get(item, this.options.rawOption[field])
      },
      getStyle(index) {
        let theme = Theme[this.options.theme]
        index = theme.length ? index % theme.length : -1
        return { background: index > -1 ? theme[index] : "" }
      }
    }
  }
</script>

<style
  scoped
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .widge-container
    margin: 0 20px
    box-sizing: border-box
    display: flex
    overflow: auto

    >>> .widge-item:first-child
      margin-left: 0

    >>> .widge-item:last-child
      margin-right: 0

    .widge-item
      position: relative
      min-width: 200px
      flex: 1
      margin: 22px 20px
      color: #ffffff
      border-radius: 7px
      padding: 20px
      box-sizing: border-box

      &-icon
        position: absolute
        right: 20px
        top: 12px
        width: 34px

      &-total
        font-weight: bold
        font-size: 36px
        line-height: 40px

      &-content
        margin-top: 5px
        display: flex
        justify-content: space-between

      &-name
        font-weight: bold
        font-size: 14px

      &-desc
        margin-top: 2px
        font-weight: bold
        font-size: 12px

</style>
