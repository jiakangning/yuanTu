<!-- 图层组件 -->
<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      size="small"
      style="margin:8px 0 8px 4%;width:92%;"
    ></el-input>
    <el-tree
      :style="{ height: divHeight - 135 + 'px', overflow: 'auto'}"
      ref="modules"
      :data="layerList"
      :props="treeProps"
      show-checkbox
      node-key="guid"
      :filter-node-method="filterNode"
      :default-checked-keys="checkedModules"
      @check-change="onModulesCheck"
      @node-click="onClickOne"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    divHeight: {
      type: Number,
      default: 700,
      required: false
    }
  },
  data() {
    return {
      filterText: "",
      treeProps: {
        label: "name",
        children: "children",
        isLeaf: "leaf"
      }
    };
  },
  mounted() {
    // 重新加载图层数据
    this.$emit('loadLayer')
  },
  computed: {
    ...mapGetters({
      layerList: "unity/layerTreeData",
      checkedModules: "unity/defaultVisibleLayers"
    })
  },
  watch: {
    filterText(val) {
      this.$refs.modules.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 控制场景的显示和隐藏
    onModulesCheck(data, checked, contains) {
      console.log(data, checked, contains);
      this.$emit("changeLayerVisible", { data, visible: checked, contains });
    },
    // 定位场景
    onClickOne(data, node, target) {
      if (data.guid && data.type !== "ImageServer") {
        this.$store.dispatch("unity/setCurrentModel", data);
      }
    },
    renderContent(h, { node, data, store }) {
      let buttons = null;
      if (node.isLeaf) {
        const delBtn = (
          <el-button
            size="mini"
            type="text"
            on-click={() => this.removeLayer(data, node)}
          >
            删除
          </el-button>
        );
        if (data.type === "Polyline") {
          buttons = (
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.routing(data)}
              >
                自动巡检
              </el-button>
              {delBtn}
            </span>
          );
        } else if (
          data.type === "Polygon" ||
          data.type === "Mark" ||
          data.type === "Sensor"
        ) {
          buttons = <span>{delBtn}</span>;
        }
      }
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          {buttons}
        </span>
      );
    },
    // 自动巡检
    routing(data) {
      this.$emit("showRouting", { payload: data });
      this.$bus.$emit("unitySendRoutingGuid", guid);
    },
    removeLayer(data, node) {
      unityDestroyEntity(data.guid);
      this.$store.dispatch("unity/removeLayer", {
        type: data.type,
        data: data
      });
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
