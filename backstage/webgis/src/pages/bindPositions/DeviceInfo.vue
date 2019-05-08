<template>
  <div>
    <div class="iconGroup">
      <a-button-group>
        <a-button type="danger" icon="delete" @click="onDel" />
        <a-button
          type="primary"
          icon="save"
          @click="$emit('updateItem', form, false)"
        />
      </a-button-group>
    </div>
    <a-form :form="form">
      <a-form-item label="设备名称" v-bind="formItemLayout">
        <a-input v-model="form.name" placeholder="" />
      </a-form-item>
      <a-form-item v-if="form.type === 'svg'" label="旋转角度" v-bind="formItemLayout">
        <a-input-number :min="-90" :max="90" v-model="form.rotate" />
      </a-form-item>
      <!-- <a-form-item label="动画开关" v-bind="formItemLayout">
        <a-switch checkedChildren="开" unCheckedChildren="关" v-model="form.animationState" />
      </a-form-item> -->
      <a-form-item label="所属系统" v-bind="formItemLayout">
        <a-select
          v-model="form.bindSystem"
          showSearch
          @change="onSystemChange"
          optionFilterProp="children"
        >
          <a-select-option
            v-for="item in sysList"
            :key="item.value"
            :value="item.value"
            >{{ item.text }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <template v-if="form.bindSystem === 'fans' && form.type === 'component'">
        <a-form-item label="风机编号" v-bind="formItemLayout">
          <a-select v-model="fanCode" @change="onFanCodeChange">
            <a-select-option value="1">1号</a-select-option>
            <a-select-option value="2">2号</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="风机等级" v-bind="formItemLayout">
          <a-select v-model="fanLevel" @change="onFanLevelChange">
            <a-select-option value="1">Ⅰ级</a-select-option>
            <a-select-option value="2">Ⅱ级</a-select-option>
          </a-select>
        </a-form-item>
      </template>

      <a-form-item v-else label="关联设备" v-bind="formItemLayout">
        <a-input v-model="form.bindGuid" disabled />
        <a-button type="primary" @click="onSelectSystem">关联设备</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    sysList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      form: this.info,
      formItemLayout: {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        }
      },
      fanCode: '',
      fanLevel: ''
    }
  },
  watch: {
    info: {
      handler (val) {
        this.form = val
        if (val.type === 'component' && val.bindGuid) {
          let guid = val.bindGuid.split('_')
          this.fanCode = guid[0]
          this.fanLevel = guid[1]
        }
      },
      deep: true
    }
  },
  methods: {
    onSelectSystem () {
      if (this.form.bindSystem) {
        this.$emit('selectSystem', this.form.bindSystem)
      } else {
        this.$message.warning('请选择所属系统');
      }
    },
    onSystemChange () {
      this.form.bindGuid = ''
    },
    onDel () {
      this.$confirm({
        title: '提示信息',
        content: '确定要删除该设备信息吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$store.dispatch('bindPositions/deletePosition', this.form)
        }
      });
    },
    onFanCodeChange(val) {
      this.form.bindGuid = `${val}_${this.fanLevel}`
    },
    onFanLevelChange(val) {
      this.form.bindGuid = `${this.fanCode}_${val}`
    }
  },
}
</script>

<style lang="less">
.ant-form-item {
  margin-bottom: 10px;
}
</style>

<style lang="less" scoped>
.iconGroup {
  text-align: right;
  margin-bottom: 10px;
}
</style>
