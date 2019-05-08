<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :default-active="curActive" background-color="#002140" text-color="#fff" active-text-color="#fff" router>
    <div v-for="item in data" :key="item.id">
      <el-submenu v-if="item.children" :index="String(item.id)">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title" v-bind:class="{ active: isCollapse }">{{item.name}}</span>
        </template>
        <div v-for="item1 in item.children" :key="item1.id">
          <el-submenu v-if="item1.children" :index="String(item1.id)">
            <template slot="title">
              <i :class="item1.icon"></i>
              <span slot="title">{{item1.name}}</span>
            </template>
            <div v-for="item2 in item1.children" :key="item2.id">
              <el-submenu v-if="item2.children" :index="String(item2.id)">
                <template slot="title">
                  <i :class="item2.icon"></i>
                  <span slot="title">{{item2.name}}</span>
                </template>

              </el-submenu>
              <el-menu-item v-if="!item2.children" :index="String(item2.id)" :route="item2.router">
                <i :class="item2.icon"></i>
                <span slot="title">{{item2.name}}</span>
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item v-if="!item1.children" :index="String(item1.id)" :route="item1.router">
            <i :class="item1.icon"></i>
            <span slot="title">{{item1.name}}</span>
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item v-if="!item.children" :index="String(item.id)" :route="item.router">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
      },
      curActive: {
        type: String,
        default() {
          return 'home'
        }
      }
    },
    data() {
      return {
        isCollapse: false,
        style: 'hidden',
      }
    },
    created() {
    },
    methods: {
      leftMenu() {
        this.isCollapse = !this.isCollapse
        if (this.isCollapse) {
          this.style = 'visible'
        } else {
          this.style = 'hidden'
        }
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .el-menu-vertical-demo::-webkit-scrollbar {
    display: none
  }

  .active {
    visibility: hidden;
  }
  .el-menu-item i {
    color: #fff;
  }
  .el-submenu__title i {
    color: #fff;
  }
</style>
