<template>
  <yt-layer :title="dialogTitle" :option="config">
    <component :is="componentType" v-bind="options"></component>
  </yt-layer>
</template>

<script>
export default {
  props: {
    dialogType: {
      type: String,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => {return {area: '50%', offset:'150px'}},
      required: false
    }
  },
  data() {
    return {
      componentType: ''
    }
  },
  components: {

  }
}
</script>

<style>

</style>
