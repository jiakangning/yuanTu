<!-- 添加标记工具 -->
<template>
  <el-card class="mark-card" >
      <div slot="header" class="clearfix">
        <span>添加标记</span>
        <el-button @click="onCloseMarkPanel" style="float: right; padding: 3px 0" type="text">关闭</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" style="width: 200px"></el-input>
          <el-color-picker class="selectColor" color-format="rgb" v-model="markNameColor" @change="onSelectColor"></el-color-picker>
          <el-popover
            placement="right"
            width="220"
            v-model="markListPanel"
            trigger="click">
            <ul class="mark-list">
              <li v-for="item in markImgData" :key="item" @click="selectMarkImg(item)">
                <img :src="'/static/images/unityMark/'+ item +'.png'" alt="">
              </li>
            </ul>
            <img slot="reference" :src="'/static/images/unityMark/'+ selectedMarkImg +'.png'" alt="">
          </el-popover>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onMarkSubmit">确定</el-button>
          <el-button @click="onCloseMarkPanel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
export default {
  props: {
    markImgData: {
      type: Array,
      default: () => {
        return [
          "一氧化碳",
          "二氧化碳",
          "人员",
          "人员定位分站",
          "入侵报警探测装置",
          "医院",
          "可燃气体检测报警器",
          "圆形",
          "圆形高亮",
          "声光报警器",
          "多参数传感器",
          "手动报警器",
          "报警",
          "排水泵",
          "方形",
          "方形高亮",
          "无线基站",
          "无线电话",
          "智能烟感传感器",
          "椭圆",
          "椭圆高亮",
          "氧气传感器",
          "消防局",
          "液位传感器",
          "温度传感器",
          "湿度传感器",
          "火灾环境测温感温光缆",
          "照明灯开关",
          "疏散口",
          "相机",
          "硫化氢探测器",
          "红旗",
          "绑定",
          "菱形",
          "菱形高亮",
          "视频",
          "进门读卡器",
          "防爆有线电话",
          "非绑定",
          "风机"
        ]
      },
      required: false
    }
  },
  data() {
    return {
      form: {
        name: "我的标记",
        desc: ""
      },
      markNameColor: "rgb(255, 0, 0)",
      selectedMarkImg: "椭圆高亮",
      markListPanel: false,
    }
  },
  methods: {
    // 创建标记
    onMarkSubmit() {
      let color = this.RGB(this.markNameColor);
      let colorStr = JSON.stringify({
        R: color[0],
        G: color[1],
        B: color[2],
        A: 1
      });
      let attribute =
        '{"CaptionSize": 20, "Caption": "' +
        this.form.name +
        '", "CaptionColor": ' +
        colorStr +
        ', "Texture": "Icon/' +
        this.selectedMarkImg +
        '"}';
      // unityUpdateEntity(this.markGuid, attribute);
      // this.clearMark();
    },
    // 取消创建
    onCloseMarkPanel() {
      // unityDestroyEntity(this.markGuid);
      // this.clearMark();
    },
    // 选择标记图标
    selectMarkImg(item) {
      this.markListPanel = false;
      this.selectedMarkImg = item;
    },
    onSelectColor(val) {
      this.markNameColor = val;
    },
    RGB(rgb) {
      let regexp = /[0-9]{0,3}/g;
      let re = rgb.match(regexp);
      let resArr = [];
      re.forEach(value => {
        if (value !== "") {
          resArr.push(Number(value / 255));
        }
      });
      return resArr;
    },
  }
}
</script>

<style lang="" scoped>
  
</style>