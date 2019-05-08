<template>
  <a-modal
    :visible="true"
    :title="title"
    :width="width"
    :destroyOnClose="true"
    :maskClosable="false"
    :footer="null"
    @cancel="handleCancel"
  >
    <!-- <template slot="footer">
      <a-button key="back" @click="handleCancel">Return</a-button>
    </template>-->
    <iframe :src="iframeUrl" frameborder="0" style="height:600px; width:100%"></iframe>
  </a-modal>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '520px'
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    iframeUrl () {
      let url= ''
      let dataType = this.data && this.data.dataType
      // 模拟量
      if (dataType === 'analog') {
        let startTime = moment().subtract(1, "hours").format("YYYY-MM-DD hh:mm:ss") // 当前时间前一小时
        let endTime = moment().format("YYYY-MM-DD hh:mm:ss")
        url = `/chart/switchinghistorycurve/viewswitchinghistorycurveshow?mineCode=12345678901234567890&beginDate=${startTime}&endDate=${endTime}&pointCode=${this.data.bindGuid}`
      } else if (dataType === 'digital') {
        // 开关量
        let startTime = moment().format("YYYY-MM-DD") + '0:00:00' // 当前时间前一小时
        let endTime = moment().format("YYYY-MM-DD") + '23:59:59'
        url = `/chart/analoghistorycurve/viewanaloghistorycurveshow?mineCode=12345678901234567890&&beginDate=${startTime}&endDate=${endTime}&pointCode=${this.data.bindGuid}`
      }
      return url
    }
  },
  methods: {
    handleCancel () {
      this.$emit('closeDialog')
    },
  }
}
</script>
