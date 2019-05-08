<template>
  <div class="viewport">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(item, index) in viewpointData"
        :key="index"
        :title="item.Group"
        style="position: relative;"
      >
        <template slot="title">
          {{item.Group}}
          <i
            @click.stop="deleteGroup(item.Group)"
            class="iconfont icon-delete"
            style="position: absolute; top: 0px; right: 50px;"
          ></i>
        </template>
        <ul class="viewpoint-list">
          <li v-for="(childItem, key) in item.Children" :key="key">
            <span>{{childItem.name}}</span>
            <img
              @dblclick="locateViewpoint(childItem)"
              :src=" 'data:image/png;base64,' + childItem.data"
              alt
            >
            <i
              @click.stop="removeViewpoint(item)"
              class="iconfont icon-delete"
              style="position: absolute; top: 0px; right: 50px;"
            ></i>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <div
      style="width:100%;height:40px;line-height:40px;background-color:#fff;border-top:1px solid #ebeef5"
    >
      <el-tooltip class="item" effect="dark" content="添加一个视口" placement="top">
        <el-button @click="addViewpoint" icon="iconfont icon-tianjia" size="mini" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="添加一个分组" placement="top">
        <el-button @click="addViewpointGroup" icon="iconfont icon-tianjia" size="mini" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    viewpointData: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    addViewpointGroup() {
      this.$emit("addViewPortGroup");
    },
    addViewpoint() {
      this.$emit("addViewPort");
    },
    removeViewpoint(viewPort) {
      this.$emit('removeViewPort', {payload: viewPort})
    },
    deleteGroup(group) {
      this.$emit('removeViewPortGroup', {payload: group})
    },
    locateViewpoint(port) {
      this.$emit('locateViewPort', {payload: port})
    }
  }
};
</script>

<style>
.viewport {
  min-height: 200px
}
.viewpoint-list {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.viewpoint-list > li {
  width: 130px;
  height: 115px;
  float: left;
}
.viewpoint-list > li:nth-child(even) {
  margin-left: 10px;
}
.viewpoint-list > li > img {
  width: 130px;
  height: 90px;
  cursor: pointer;
}
.viewpoint-list > li > span {
  font-size: 12px;
  float: left;
  margin-left: 5px;
}
.viewpoint-list > li > .checkbox {
  float: left;
  cursor: pointer;
}
</style>
