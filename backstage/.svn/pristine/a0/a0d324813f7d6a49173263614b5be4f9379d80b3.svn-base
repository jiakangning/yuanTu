<template>
  <div class="map-page">
    <div class="map-page-main">
      <div class="map"></div>
      <div class="map-toolbar">
        <div
          class="map-toolbar-item"
          :class="panelApply ? 'active' : ''"
          @click="togglePanel('panelApply')">用车申请<span class="badge">90</span></div>
        <div
          class="map-toolbar-item"
          :class="panelOrder ? 'active' : ''"
          @click="togglePanel('panelOrder')">订单<span class="badge">{{ orders.length }}</span></div>
        <div
          class="map-toolbar-item"
          :class="panelPerson ? 'active' : ''"
          @click="togglePanel('panelPerson')"><i class="runicon iconjixiao"></i><span class="badge">{{ persons.length }}</span></div>
        <div
          class="map-toolbar-item"
          :class="panelCar ? 'active' : ''"
          @click="togglePanel('panelCar')"><i class="runicon iconcar-fill"></i><span class="badge">56</span></div>
        <div
          class="map-toolbar-item search">
          <el-input
            v-model="keywords"
            @focus="onFocus"
            placeholder="搜索订单号、人员姓名、车牌号">
            <i
              slot="suffix"
              class="runicon iconsearch"
              @click="onSearch"></i>
          </el-input>
        </div>
        <div
          class="map-toolbar-item active"
          @click="togglePopup">{{(hasPanel && show) ? '收缩' : '展开' }}</div>
      </div>
    </div>
    <div
      class="map-page-popup"
      :style="(hasPanel && show) ? 'flex-basis:300px' : 'flex-basis:0'">
      <panel
        v-show="panelApply"
        :marquee="false"
        title="用车申请">
        <div class="title">
          <span>起点</span>
          <span>终点</span>
          <span>用车时段</span>
          <span>操作</span>
        </div>
        <li
          class="panel-item"
          v-for="(apply, index) in applys"
          :key="index"
          slot="list">
          <span>{{ apply.startText }}</span>
          <span>{{ apply.endText }}</span>
          <span>{{ apply.time }}</span>
          <span><el-button
            type="text"
            size="mini">派单</el-button></span>
        </li>
      </panel>
      <panel
        v-show="panelOrder"
        :marquee="false"
        title="订单信息">
        <div class="title">
          <span>下单人</span>
          <span>下单时间</span>
          <span>订单状态</span>
          <span>订单流程</span>
        </div>
        <li
          class="panel-item"
          v-for="(order, index) in orders"
          :key="index"
          slot="list">
          <span>{{ order.orderPerson }}</span>
          <span>{{ order.date }}</span>
          <span>{{ order.state }}</span>
          <span><el-button
            type="text"
            size="mini">查看</el-button></span>
        </li>
      </panel>
      <panel
        v-show="panelPerson"
        :marquee="true"
        :height="300"
        title="井下人员"
        :content="persons">
        <div class="title">
          <span style="flex: 0 0 50px">头像</span>
          <span>姓名</span>
          <span>部门</span>
          <span>轨迹</span>
        </div>
        <li
          class="panel-item"
          v-for="(person, index) in persons"
          :key="index"
          slot="list">
          <span style="flex: 0 0 50px"><img
            style="border-radius: 50%"
            :src="person.photo"/></span>
          <span>{{ person.startText }}</span>
          <span>{{ person.time }}</span>
          <span><i class="runicon iconjixiao"></i></span>
        </li>
      </panel>
      <panel
        v-show="panelCar"
        :marquee="true"
        :height="300"
        title="井下车辆"
        :content="cars">
        <div class="title">
          <span style="flex: 0 0 50px">序号</span>
          <span>车牌号</span>
          <span>部门</span>
          <span>轨迹</span>
        </div>
        <li
          class="panel-item"
          v-for="(car, index) in cars"
          :key="index"
          :class="car.current ? 'active' : ''"
          slot="list">
          <span style="flex: 0 0 50px">{{ car.id }}</span>
          <span>{{ car.startText }}</span>
          <span>{{ car.time }}</span>
          <span><i class="runicon iconcar-fill"></i></span>
        </li>
      </panel>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import panel from './panel.vue'

  export default {
    name: 'map-page',
    components: { panel },
    data () {
      return {
        show: true,
        applys: [],
        orders: [],
        persons: [],
        cars: [],
        keywords: '',
        panelApply: true,
        panelOrder: true,
        panelPerson: true,
        panelCar: true,
        timeId: null
      }
    },
    computed: {
      hasPanel () {
        return this.panelApply || this.panelOrder || this.panelPerson || this.panelCar
      }
    },
    created () {
      const { applys, orders, persons, cars } = Mock.mock({
        'applys|20': [
          {
            'id|+1': 1,
            'startText': () => Mock.Random.ctitle(3, 5),
            'endText': () => Mock.Random.ctitle(3, 5),
            'time' () {
              return `${Mock.Random.date('hh:mm')}-${Mock.Random.date('hh:mm')}`
            }
          }
        ],
        'orders|100': [
          {
            'id|+1': 1,
            'orderPerson': () => Mock.Random.cname(),
            'date': () => Mock.Random.date('MM-dd hh:mm'),
            'state|1': [0, 1]
          }
        ],
        'persons|100': [
          {
            'id|+1': 1,
            'photo': () => Mock.Random.image('30x30'),
            'startText': () => Mock.Random.ctitle(3, 5),
            'endText': () => Mock.Random.ctitle(3, 5),
            'time' () {
              return `${Mock.Random.date('hh:mm')}-${Mock.Random.date('hh:mm')}`
            }
          }
        ],
        'cars|3': [
          {
            'id|+1': 1,
            'startText': () => Mock.Random.ctitle(3, 5),
            'endText': () => Mock.Random.ctitle(3, 5),
            'time' () {
              return `${Mock.Random.date('hh:mm')}-${Mock.Random.date('hh:mm')}`
            },
            'current|1' () {
              return this.id === 1
            }
          }
        ]
      })
      this.applys = applys
      this.orders = orders
      this.persons = persons
      this.cars = cars

      this.timeId = setInterval( () => {
        this.cars.push({
          id: 2,
          startText: '起点',
          endText: '终点',
          time: '',
          current: true
        })
      }, 3000)
    },
    methods: {
      togglePopup () {
        if (!this.hasPanel || !this.show) {
          this.show = true
          this.panelCar = true
          this.panelPerson = true
          this.panelOrder = true
          this.panelApply = true
        } else {
          this.show = false
          this.panelCar = false
          this.panelPerson = false
          this.panelOrder = false
          this.panelApply = false
        }
      },
      togglePanel (name) {
        switch (name) {
          case 'panelApply':
            this.panelApply = !this.panelApply
            if (this.panelApply) this.show = true
            break
          case 'panelPerson':
            this.panelPerson = !this.panelPerson
            if (this.panelPerson) this.show = true
            break
          case 'panelOrder':
            this.panelOrder = !this.panelOrder
            if (this.panelOrder) this.show = true
            break
          case 'panelCar':
            this.panelCar = !this.panelCar
            if (this.panelCar) this.show = true
            break
          default:
            break
        }
      },
      onSearch () {
        alert('发送 http 请求')
      },
      onFocus () {
        this.show = true
        this.panelCar = true
        this.panelPerson = true
        this.panelOrder = true
        this.panelApply = true
      }
    }
  }
</script>

<style
  type="text/stylus"
  rel="stylesheet/stylus"
  scoped
  lang="stylus">
  .map-page
    display flex
    flex-direction column
    width 100%
    height 100%
    &-main
      position relative
      flex auto
      background-color lightgoldenrodyellow
    &-popup
      display flex
      background-color #fafafa
      transition all .5s ease-out
      overflow hidden
      & > div
        flex 1

  .map-toolbar
    position absolute
    bottom 0
    right 0
    display flex
    height 55px
    background-color #002140
    color #fff
    &-item.active
      color #fff
    &-item
      padding 10px 20px
      position relative
      display flex
      align-items center
      position relative
      cursor pointer
      color rgba(255, 255, 255, .5)
      &.search
        position static
        >>> .el-input
          width 100%
        >>> .el-input__inner
          width 280px
          padding 0 14px
          line-height 32px
          border-radius 50px
        >>> .el-input__suffix .runicon
          position relative
          top 3px
          right 8px
          font-size 25px
      .runicon
        font-size 30px
        transition all 1s ease
      >>> .el-input
        transition all 2s ease
      >>> .el-input__inner
        height 32px
        width 0
        border 0
        padding 0
        transition all 1s ease
      .badge
        position absolute
        top 0px
        right 5px
        background-color red
        font-size 12px
        padding: 5px
        border-radius 50%
        color #fff

  .title
    display flex
    padding-bottom 10px
    background-color #fafafa
    font-size 14px
    span
      flex 1
      text-align center

  .panel-item
    display flex
    align-items center
    height 40px
    font-size 12px
    &.active
      background-color #fafad2
    span
      flex 1
      text-align center
      .runicon
        width 28px
        height 28px
        font-size 22px
        color #409EFF
        cursor pointer

</style>
