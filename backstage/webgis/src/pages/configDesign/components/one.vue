<template>
  <div class="comContent">
    <div class="contentL">{{name}}</div>
    <div class="contentR">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="12">
          <div class="attributes">
            <div class="field">输出电流</div>
            <div class="value">{{fanInfo.outElectricity}}</div>
            <div class="unit">A</div>
          </div>
          <div class="attributes">
            <div class="field">输出电压</div>
            <div class="value">{{fanInfo.outVoltage}}</div>
            <div class="unit">V</div>
          </div>
          <div class="attributes">
            <div class="field">输出功率</div>
            <div class="value">{{fanInfo.outPower}}</div>
            <div class="unit">KW</div>
          </div>
          <div class="attributes">
            <div class="field">运行频率</div>
            <div class="value">{{fanInfo.runRate}}</div>
            <div class="unit">HZ</div>
          </div>
          <div class="attributes">
            <div class="field">设定频率</div>
            <div class="value">{{fanInfo.designRate}}</div>
            <div class="unit">HZ</div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="attributes">
            <div class="field">定子温度A</div>
            <div class="value">{{fanInfo.temperatureA}}</div>
            <div class="unit">℃</div>
          </div>
          <div class="attributes">
            <div class="field">定子温度B</div>
            <div class="value">{{fanInfo.temperatureB}}</div>
            <div class="unit">℃</div>
          </div>
          <div class="attributes">
            <div class="field">定子温度C</div>
            <div class="value">{{fanInfo.temperatureC}}</div>
            <div class="unit">℃</div>
          </div>
          <div class="attributes">
            <div class="field">前轴温度</div>
            <div class="value">{{fanInfo.temperatureFront}}</div>
            <div class="unit">℃</div>
          </div>
          <div class="attributes">
            <div class="field">后轴温度</div>
            <div class="value">{{fanInfo.temperatureBack}}</div>
            <div class="unit">℃</div>
          </div>
        </a-col>
      </a-row>
    </div>
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
  computed: {
    name() {
      let guid = this.data.bindGuid.split('_')
      let level = '--'
      if (guid[1] === '1') {
        level = 'Ⅰ'
      } else if(guid[1] === '2') {
        level = 'Ⅱ'
      }
      return `${guid[0] || '--'}号${level}级`
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
    border-radius: 5px;
    .contentL {
      display:flex;
      justify-content:center;
      align-items:center;
      height: 100%;
      font-size: 16px;
      color: #ffffff;
      width: 32px;
      background: #762200;
      border-radius: 4px;
    }
    .contentR {
      flex: 1;
      height: 100%;
    }
    .ant-row, .ant-col-12, .ant-col-10, .ant-col-14 {
      height: 100%;
    }
    .attributes {
      display: flex;
      height: 20%;
      justify-content:center;
      align-items:center;
      .field {
        color: #f6fb02;
        width: 70px;
      }
      .value{
        flex: 1;
        text-align: right;
      }
      .unit {
        width: 30px;
        text-align: right;
      }
    }
  }  
</style>