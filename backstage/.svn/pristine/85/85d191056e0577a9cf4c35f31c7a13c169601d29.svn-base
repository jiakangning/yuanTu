<template>
  <div class="comContent">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="10">
        <div class="content">
          <div class="name">{{name}}#风机水平风门</div>
          <div class="value">
            <a-switch checkedChildren="开" disabled unCheckedChildren="关" :defaultChecked="fanInfo.horizontalFan" />
          </div>
          <div class="description">
            {{fanInfo.horizontalFanDes || '未知'}}
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="14">
        <div class="content">
          <div class="name">{{name}}#风机垂直风门</div>
          <div class="show">
            <div class="value">{{name}}#1开</div>
            <div class="value"><a-switch checkedChildren="开" disabled unCheckedChildren="关" :defaultChecked="fanInfo.verticalFan1" /></div>
            <div class="value">{{name}}#1关</div>
            <div class="desc">{{fanInfo.verticalFan1Des || '未知'}}</div>
          </div>
          <div class="show">
            <div class="value">{{name}}#2开</div>
            <div class="value"><a-switch checkedChildren="开" disabled unCheckedChildren="关" :defaultChecked="fanInfo.verticalFan2" /></div>
            <div class="value">{{name}}#2关</div>
            <div class="desc">{{fanInfo.verticalFan2Des || '未知'}}</div>
          </div>               
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultChecked: false
    }
  },
  computed: {
    name() {
      let guid = this.data.bindGuid.split('_')
      return guid[0] ? guid[0] : '-'
    },
    fanInfo() {
      return this.data.value || {}
    }
  }
}
</script>

<style lang="less">
  .comContent {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgba(255,255,255,0.3);
    padding: 10px;
    .ant-row {
      width: 100%;
    }
    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      .value, .description {
        display:flex;
        flex: 1;
        justify-content: center;
        align-items:center;
      }
      .name {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #ffffff;
        background: #762200;
        border-radius: 4px;
      }
      .description, .show {
        color: #ffffff;
        font-size: 16px;
      }
    }
    .show {
      display: flex;
      flex: 1;
      justify-content:center;
      align-items:center;
      .value{
        width: 50px;
      }
      .desc{
        flex: 1;
      }
    }
  }  
</style>