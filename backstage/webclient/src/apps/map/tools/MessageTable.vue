<template>
  <div>
    <div class="messageTable-home" :class="{'is-close': showMessage}">
      <!-- 分类消息 - 机电，生产，安全 。。。 -->
      
    </div>
    <div class="messageTableBtn" :class="showMessage?'hiddenMessage':''">
      <div :class="['icon-btn', {'active': !showMessage && messageName === 'alarmLinkage'}]" @click="toggleMessage('alarmLinkage')"><i class="iconfont icon-bell"></i></div>
      <div :class="['icon-btn', {'active': !showMessage && messageName === 'subjectMsg'}]" @click="toggleMessage('subjectMsg')"><i class="el-icon-message"></i></div>
      <div :class="['icon-btn', {'active': !showMessage && messageName === 'analysisAlarm'}]" @click="toggleMessage('analysisAlarm')"><i class="iconfont icon-pie-chart"></i></div>
      <div :class="['icon-btn', {'active': !showMessage && messageName === 'risk'}]" @click="toggleMessage('risk')"><i class="iconfont icon-yusan"></i></div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        // 是否显示消息面板
        showMessage: false,
        messageName: 'subjectMsg',
      }
    },
    created() {
    },
    methods: {
      toggleMessage (msgName) {
        if (msgName === 'alarmLinkage') {
          this.$emit('onShowAlarm')
          return
          // this.$router.push('/monitoring/alarmLinage')
        }
        // 设置选中状态
        if (msgName === this.messageName) {
          this.showMessage = !this.showMessage
        } else {
          this.showMessage = false
        }
        this.messageName = msgName
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .messageTable-home {
    position: absolute;
    bottom: 60px;
    right: 50px;
    z-index: 88;
    transition: all 0.3s cubic-bezier(0.03, 1.18, 0.65, 1.46);
    transform-origin: right bottom;
    &.is-close {
      transform: scale(0);
      transition: all 0.3s cubic-bezier(0.22, -0.28, 0.95, 0.28);
    }
  }

  .messageTableBtn {
    position: absolute;
    transition: all 0.3s ease;
    width: 40px;
    height: 160px;
    right: 0px;
    bottom: 60px;
    z-index: 89;
    background: #f5f5f5;
    text-align: center;
    box-shadow: 0px 1px 1px 0px #aaaaaa;
    line-height: 40px;
    font-size: 18px;
    .icon-btn {
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      i {
        font-size: 18px;
        line-height: 40px;
      }
      &.active {
        color: #00aaff;
      }
    }
  }
</style>

