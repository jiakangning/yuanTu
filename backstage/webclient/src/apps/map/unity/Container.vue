<template>
  <div class="unity-map">
    <!-- 主地图窗口 -->
    <Map
      :loaded="loaded"
      :modelList="modelList"
      :showMapMenu="showPropertyMenu"
      :menuList="menuList"
      @getMenus="setMenus"
      @onMapReady="onMapReady"
      @clickMenu="clickMenu"
    />
    <!-- 左上角搜索 -->
    <SearchTool/>
    <!-- 右上角工具 -->
    <LayerAndTools @changeLayerVisible="changeLayerVisible" @loadLayer="loadLayer"/>
    <!-- 弹窗 -->
    <Dialog
      v-if="showDialog"
      :dialogType="dialogType"
      :dialogTitle="dialogTitle"
      :options="dialogOptions"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Map from "./Map";
import LayerAndTools from "./LayerAndTools";
import SearchTool from "./tools/SearchTool";
import Dialog from "./Dialog";
export default {
  data() {
    return {
      dialogType: "",
      showDialog: false,
      dialogTitle: "",
      dialogOptions: null,
      showPropertyMenu: true,
      modelList: null,
      menuList: null
    };
  },
  computed: {
    ...mapState({
      isInUnity: state => state.unity.isInUnity,
      loaded: state => state.unity.loaded,
      layerList: state => state.unity.layerList
    })
  },
  components: {
    Map,
    LayerAndTools,
    SearchTool,
    Dialog
  },
  mounted() {
    const self = this;
    (window.loadAllLayers = result => {
      console.log(result);
      if (Object.keys(result).length > 0) {
        let checkArray = [];
        let sceneArray = [];
        for (let type in result) {
          let category = {
            name: self.$t(`unity.layer.${type}`),
            level: "type",
            type: type
          };
          let info;
          const groupList = result[type].map(item => {
            info = JSON.parse(item);
            return {
              name: info.Name,
              guid: info.ID,
              type: info.LayerType,
              visible: info.Visible,
              level: "group",
              parent: category
            };
          });
          sceneArray = sceneArray.concat([category], groupList);
        }
        console.log(sceneArray);
        this.$store.dispatch("unity/insertLayer", sceneArray);
      }
    }),
      (window.loadAllEntities = result => {
        self.$store.dispatch("unity/loadLayers", result);
      });
  },
  methods: {
    setMenus({ type, payload }) {
      switch (payload.entity.EntityType) {
        case "Tunnel":
          this.menuList = [
            {
              name: "详细信息",
              serial: payload.guid,
              type: payload.entity.EntityType,
              commond: {
                openDialog: true,
                dialogType: ''
              }
            },
            {
              name: "进入内部",
              serial: payload.guid,
              type: payload.entity.EntityType,
              position: payload.point,
              commond: {
                openDialog: false,
                unityCmd: () => unityEnterTunnel(payload.guid, payload.point)
              }
            }
          ];
          if (payload.entity.OpenShow === false) {
            this.menuList.push({
              name: "巷道半开",
              serial: payload.guid,
              type: payload.entity.EntityType,
              commond: {
                openDialog: false,
                unityCmd: () => unityUpdateEntity(payload.guid, '{"OpenShow": true}')
              }
            });
          } else {
            this.menuList.push({
              name: "关闭半开",
              serial: payload.guid,
              type: payload.entity.EntityType,
              commond: {
                openDialog: false,
                unityCmd: () => unityUpdateEntity(payload.guid, '{"OpenShow": false}');
              }
            });
          }
          break;
        case "Sensor":
          this.menuList = [
            {
              name: "详细信息",
              serial: payload.entity.GUID,
              system: JSON.parse(payload.entity.SubSystem),
              type: payload.entity.EntityType,
              group: payload.entity.Group,
              commond: {
                openDialog: true,
                dialogType: ''
              }
            }
          ];
          if (
            payload.entity.Group === "矿工" ||
            payload.entity.Group === "矿车"
          ) {
            this.menuList.push({
              name: "历史轨迹",
              serial: payload.entity.GUID,
              system: JSON.parse(payload.entity.SubSystem),
              type: payload.entity.EntityType,
              group: payload.entity.Group,
              commond: {
                openDialog: true,
                dialogType: ''
              }
            });
          }
          break;
        default:
          this.menuList = [
            {
              name: "详细信息",
              serial: payload.guid,
              type: payload.entity.EntityType,
              commond: {
                openDialog: true,
                dialogType: ''
              }
            }
          ];
          break;
      }
    },
    onMapReady() {
      this.$store.dispatch("unity/loadUnity", true);
      // 获取模型数据
    },
    changeLayerVisible({ data, visible, contains }) {
      switch (data.level) {
        case "type":
          if (data.type === "ImageServer") {
            for (let i = 0; i < data.children.length; i++) {
              let guid = data.children[i].guid;
              unityUpdateLayer(guid, '{"Visible": ' + visible + "}");
            }
          } else {
            for (let k = 0; k < data.children.length; k++) {
              let itemData = data.children[k].children;
              for (let j = 0; j < itemData.length; j++) {
                let guid = itemData[j].guid;
                unityUpdateEntity(guid, '{"Visible": ' + visible + "}");
              }
            }
          }
          break;
        case "group":
          if (data.type === "ImageServer") {
            unityUpdateLayer(data.guid, '{"Visible": ' + visible + "}");
          } else {
            for (let i = 0; i < data.children.length; i++) {
              let guid = data.children[i].guid;
              unityUpdateEntity(guid, '{"Visible": ' + visible + "}");
            }
          }
          break;
        case "item":
          unityUpdateEntity(data.guid, '{"Visible": ' + visible + "}");
          break;
        default:
          break;
      }
    },
    // 获取图层数据
    loadLayer() {
      unityGetAllEntity("loadAllEntities");
      unityGetAllLayer("loadAllLayers");
    },
    clickMenu(menu) {
      console.log(menu)
      if(menu.commond && menu.commond.openDialog) {
        // 打开对应的弹窗
        this.dialogTitle = menu.name
        this.dialogType = menu.commond.dialogType
        this.dialogOptions = menu.entity
        this.openDialog = true
      } else {
        // 执行对应的三维命令
        menu.commond && menu.commond.unityCmd()
      }
    }
  }
  // watch: {
  //   layerList: {
  //     // 根据visible属性渲染场景
  //     handler: function(value) {
  //       console.log(value)
  //       value.forEach(ele => {
  //         switch (ele.level) {
  //           case 'type':

  //             break;
  //           case 'group':

  //             break;
  //           case 'item':
  //             unityUpdateEntity(ele.guid, '{"Visible": ' + ele.visible + "}");
  //             break
  //           default:
  //             break;
  //         }
  //       });
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<style lang="less" scoped>
.unity-map {
  width: 100%;
  height: 100%;
  background: transparent;
  // position: relative;
}
.no-main {
  width: 100%;
  height: 100%;
  font-size: 30px;
  color: #da251c;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    text-align: center;
    flex: auto;
  }
}
</style>