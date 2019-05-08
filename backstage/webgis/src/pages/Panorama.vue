<template>
  <router-view></router-view>
</template>

<script>
import io from 'socket.io-client'
import { SocketConfig } from '@/config'
import { mapState } from 'vuex'
import moment from 'moment'
import { buildFan } from '@/models/Fan'
export default {
  data() {
    return {
      flowSocket: null,
      pressureSocket: null,
      fanSocket: null,
      drainageSocket: null,
      safeSocket: null,
    }
  },
  computed: {
    ...mapState({
      bindedPositions: state => state.bindPositions.bindedPositions
    })
  },
  created () {
    this.flowSocket = io(SocketConfig.flows, { autoConnect: false })
    this.pressureSocket = io(SocketConfig.pressures, { autoConnect: false })
    this.fanSocket = io(SocketConfig.fans, { autoConnect: false })
    this.drainageSocket = io(SocketConfig.drainages, { autoConnect: false })
    this.safeSocket = io(SocketConfig.safties, { autoConnect: false })
  },
  mounted() {
    // 开启socket
    this.initSocketIo()
    // 初始化数据
    this.$store.dispatch('bindPositions/initPositions')
  },
  methods: {
    // 开启socket
    initSocketIo() {
      this.flowSocket.open()
      this.flowSocket.on('data', ({ payload }) => {
        this.handleSocketData('flow/setFlows', payload)
      })
      this.pressureSocket.open()
      this.pressureSocket.on('data', ({ payload }) => {
        this.handleSocketData('pressure/setPressures', payload)
      })
      this.fanSocket.open()
      this.fanSocket.on('data', ({ payload }) => {
        this.handleSocketData('fan/setFans', payload)
      })
      this.drainageSocket.open()
      this.drainageSocket.on('data', ({ payload }) => {
        this.handleSocketData('drainage/setDrainages', payload)
      })
      this.safeSocket.open()
      this.safeSocket.on('data', ({ payload }) => {
        this.handleSocketData('safe/setSafties', payload, true)
      })
    },
    handleSocketData(path, payload, flag) {
      let data = payload.filter(item => {
        if (flag) {
          return Object.assign(item, {time: item.time ? moment(item.time).format('YYYY-MM-DD HH:mm:ss') : ''})
        }else if (item.value) {
          return Object.assign(item, {time: item.time ? moment(item.time).format('YYYY-MM-DD HH:mm:ss') : ''})
        }
      })
      this.$store.dispatch(path, [...data])
      this.matchingData(data, path)
    },
    matchingData(data, path) {
      let positions = this.bindedPositions.map(ele => {
        if (ele.type === 'component' && path === 'fan/setFans') {
          return this.handleConfigData(data, ele)
        } else {
          return this.handleSensorData(data, ele)
        }
      })
      this.$store.commit('bindPositions/setPositions', positions)
    },
    handleSensorData(data, ele) {
      let info = data.find(item => item.tag === ele.bindGuid)
      if (info) {
        ele.dataType = info.dataType
        ele.value = info.value
        ele.unit = info.unit || ''
        ele.animationState = info.value && info.value !== 'false' ? true : false
        // ele.isAlarm = info.state === '正常' ? false : true
        ele.isAlarm = info.alarm === 'false' ? false : true
      }
      return {...ele}
    },
    handleConfigData(data, ele) {
      if (ele.bindGuid) {
        let fanData = ele.bindGuid.split('_')
        ele.value = buildFan(data, fanData[0], fanData[1])
      }
      return {...ele}
    }
  },
  destroyed () {
    this.flowSocket && this.flowSocket.disconnect()
    this.pressureSocket && this.pressureSocket.disconnect()
    this.fanSocket && this.fanSocket.disconnect()
    this.drainageSocket && this.drainageSocket.disconnect()
    this.safeSocket && this.safeSocket.disconnect()
  }
}
</script>