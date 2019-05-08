<template>
  <!-- 风支信息 -->
  <div class="windBrandchInfo">
    <el-form ref="form" :model="form" label-width="85px">
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 名称 -->
          <fieldset>
            <legend>名称</legend>
            <el-row>
              <el-col :span="24">
                <el-form-item label="风支名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="始节点编号">
                  <el-input v-model="form.startCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="change">
                <el-tooltip class="item" effect="dark" content="切换" placement="top">
                  <span class="el-icon-sort" @click="onChange"></span>
                </el-tooltip>
              </el-col>
              <el-col :span="10">
                <el-form-item label="末节点编号">
                  <el-input v-model="form.endCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="始节点温度">
                  <el-input v-model="form.startTemperature"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="center">
                <el-button icon="el-icon-menu" circle @click="onStartTemperature"></el-button>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-form-item label="末节点温度">
                  <el-input v-model="form.endTemperature"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="center">
                <el-button icon="el-icon-menu" circle @click="onEndTemperature"></el-button>
              </el-col>
            </el-row>
          </fieldset>
          <!-- 属性 -->
          <fieldset>
            <legend>属性</legend>
            <el-row class="rowH">
              <el-col :span="24">
                <el-row class="rowH">
                  <el-col :span="8">
                    <el-checkbox v-model="form.sa">末端不闭合</el-checkbox>
                  </el-col>
                  <el-col :span="8">
                    <el-checkbox v-model="form.sb">不参与解算</el-checkbox>
                  </el-col>
                  <el-col :span="8">
                    <el-checkbox v-model="form.sc">连接到大气</el-checkbox>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-checkbox v-model="form.sd">风路长度</el-checkbox>
              </el-col>
              <el-col :span="16">
                <el-input placeholder="570.70" v-model="form.se">
                  <template slot="append">m</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-checkbox v-model="form.sf">调节风窗</el-checkbox>
              </el-col>
              <el-col :span="16">
                <el-input placeholder="0.00" v-model="form.sg">
                  <template slot="append">m<sup>2</sup></template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-button @click="onShuntType">分流类型</el-button>
              </el-col>
              <el-col :span="16">
                <el-select v-model="form.shuntType">
                  <el-option v-for="item in shuntTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </fieldset>
          <!-- 选项 -->
          <fieldset>
            <legend>选项</legend>
            <el-row :gutter="10" class="rowH">
              <el-col :span="8">
                <el-button @click="onOptionWind">风&emsp;&emsp;阻</el-button>
                <el-button icon="el-icon-setting" circle class="setting" @click="onOptionWindSet"></el-button>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="0.00" v-model="windResistance">
                  <template slot="append">Ns2/m8</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-select v-model="form.windResistance">
                  <el-option v-for="(item, index) in windResistances" :value-key="item.value" :key="index" :label="item.name" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button @click="onMCXS">摩擦系数</el-button>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="0.00" v-model="friction">
                  <template slot="append">kg/m2</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-select v-model="form.friction">
                  <el-option v-for="(item, index) in frictions" :value-key="item.value" :key="index" :label="item.name" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="24">
                <el-form-item label="局部阻力">
                  <el-input placeholder="0.00" v-model="form.xd">
                  <template slot="append">Pa</template>
                </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="总阻力">
                  <el-input placeholder="0.00" v-model="form.xe">
                  <template slot="append">Ns2/m8</template>
                </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-col>
        <el-col :span="12">
          <fieldset>
            <legend>类型</legend>
            <el-row>
              <el-col :span="24">
                <el-form-item label="巷道断面">
                  <el-select v-model="form.roadwaySection" placeholder="请选择活动区域">
                    <el-option v-for="item in roadwaySections" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="巷道宽度">
                  <el-input placeholder="12" v-model="form.width">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="巷道高度">
                  <el-input placeholder="12" v-model="form.height">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="巷道面积">
                  <el-input placeholder="12" v-model="form.area">
                    <template slot="append">m<sup>2</sup></template>
                  </el-input>
                </el-form-item>
                <el-form-item label="巷道周长">
                  <el-input placeholder="12" v-model="form.perimeter">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="实测风量">
                  <el-input placeholder="12" v-model="form.mAirVolume">
                    <template slot="append">m2/s</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="风 量">
                  <el-input placeholder="12" v-model="form.airvolume">
                    <template slot="append">m2/s</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="实测阻力">
                  <el-input placeholder="12" v-model="form.mResistance">
                    <template slot="append">Pa</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="阻 力">
                  <el-input placeholder="12" v-model="form.resistance">
                    <template slot="append">Pa</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="风 速">
                  <el-input placeholder="12" v-model="form.windSpeed">
                    <template slot="append">m/s</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </el-col>
      </el-row>
    </el-form>
    <el-button @click="onSubmit">提交</el-button>
    <run-layer
      :title="layerTitle"
      v-model="layerShow">
      <component :is="currentComponent" :dataOption="componentData" @close="layerShow = !layerShow" @submit="saveData"></component>
    </run-layer>
  </div>
</template>

<script>
import dataSourceConfig from './components/dataSourceConfig'
export default {
  components: {
    dataSourceConfig
  },
  data() {
    return {
      layerTitle: '信息',
      layerShow: false,
      currentComponent: '',
      componentData: {
        type: '',
        windResistance: [],
        friction: [],
        shuntTypes: []
      },
      form: {
        name: '', // 名称
        startCode: '',
        endCode: '',
        startTemperature: '',
        endTemperature: '',
        sa: '', // 属性
        sb: '',
        sc: '',
        sd: '',
        se: '',
        sf: '',
        sg: '',
        shuntType: { value: '1', name: '未订制'},
        xa: '', // 选项
        windResistance: { value: '1', name: '自动'},
        friction: { value: '1', name: '自动'},
        xd: '',
        xe: '',
        roadwaySection: 1, // 类型
        width: 12,
        height: 12,
        area: 12,
        perimeter: 12,
        mAirVolume: 12,
        airVolume: 12,
        mResistance: 12,
        resistance: 12,
        windSpeed: 12
      },
      // 巷道断面
      roadwaySections: [
        {id: 1, name: '半圆拱'},
        {id: 2, name: '圆弧拱'},
        {id: 3, name: '三心拱'},
        {id: 4, name: '矩形'},
        {id: 5, name: '梯形'},
        {id: 6, name: '订制'}
      ],
      // 风流类型
      shuntTypes: [
        {value: '', name: '未订制'}
      ],
      // 风阻
      windResistances: [
        {value: '1', name: '自动'}
      ],
      // 摩擦
      frictions: [
        {value: '1', name: '自动'}
      ]
    }
  },
  computed: {
    windResistance() {
      return this.form.windResistance.value
    },
    friction() {
      return this.form.friction.value
    }
  },
  methods: {
    // 切换
    onChange() {
      let code, temperature;
      code = this.form.startCode
      temperature = this.form.startTemperature
      this.form.startCode = this.form.endCode
      this.form.endCode = code
      this.form.startTemperature = this.form.endTemperature
      this.form.endTemperature = temperature
    },
    onStartTemperature() {
      console.log('始节点');
    },
    onEndTemperature() {
      console.log('末节点');
    },
    onShuntType() {
      this.shuntTypes.shift()
      this.componentData = {
        type: 'shuntTypes',
        data: this.shuntTypes
      }
      this.layerTitle = '风流类型'
      this.layerShow = true
      this.currentComponent = 'dataSourceConfig'
    },
    onOptionWind() {
      this.windResistances.shift()
      this.componentData = {
        type: 'windResistances',
        data: this.windResistances
      }
      this.layerTitle = '风阻信息'
      this.layerShow = true
      this.currentComponent = 'dataSourceConfig'
    },
    onOptionWindSet() {
      console.log('风阻设置');
    },
    onMCXS() {   
      this.frictions.shift()
      this.componentData = {
        type: 'frictions',
        data: this.frictions
      }
      this.layerTitle = '摩擦系数'
      this.layerShow = true
      this.currentComponent = 'dataSourceConfig'
    },
    saveData(type, data) {
      this.layerShow = false
      switch(type) {
        case 'windResistances': 
          this[type] = [].concat([{value: '1', name: '自动'}])
          break
        case 'frictions': 
          this[type] = [].concat([{value: '1', name: '自动'}])
          break
        case 'shuntTypes': 
          this[type] = [].concat([{value: '', name: '未订制'}])
          break
      }
      this[type] = this[type].concat(data)
      // 保存数据
    },
    onSubmit() {
      console.log(Object.assign(this.form,{fz: this.windResistance, mcxs: this.friction}))
    }
  }
}
</script>

<style lang="less">
.windBrandchInfo {
  fieldset {
    border: 1px solid #cccc;
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    border-radius: 5px;
  }
  legend {
    padding: 0 10px;
    color: #333;
  }
  .change {
    cursor: poiter;
    text-align: center;
    font-size: 50px;
    position: relative;
    top: 25px;
    span {
      cursor: poiter;
      transform: rotate(270deg);
    }
  }
  .rowH {
    .el-col {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
  }
  .el-input-group__append {
    border-left: 0;
    font-size: 12px;
    padding: 8px;
  }
  .el-select {
    width: 100%;
  } 
  .setting {
    position: absolute;
    left: 102px;
  }
  .center {
    text-align: center;
  }
}
</style>
