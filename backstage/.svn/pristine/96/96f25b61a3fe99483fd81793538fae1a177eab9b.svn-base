<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './global.less'
export default {
  name: 'app',
  computed: {
    noticeInfo () {
      return this.$store.state.noticeInfo
    }
  },
  watch: {
    noticeInfo: {
      handler (value) {
        this.$message[value.type](value.message)
      },
      deep: true
    }
  }
}
</script>
