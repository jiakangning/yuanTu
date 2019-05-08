<template>
  <div style="width: 100%;height: 100%;overflow-y:auto">
    <ul class="svgImgList">
      <drag v-for="(item, index) in data" :key="index"
        :image="item.imgSrc"
        :transfer-data="item"
        >
        <li>
          <a class="item" @click="$emit('svgClick', item)">
            <img :src="item.imgSrc" :title="item.name" />
            <div>
              <p :title="item.name">{{item.name}}</p>
            </div>
          </a>
        </li>
      </drag>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="less" scoped>
.svgImgList {
  list-style: none;
  margin-right: 0px;
  padding: 0px;
  height: 100%;
  li {
    display: inline;
    float: left;
    margin: 10px;
  }
  li:last-child::after{
    clear: both;
  }
  .item {
    text-decoration: none;
    cursor: pointer;
    img {
      display: block;
      border: 1px solid #ccc;
      width: 60px;
      height: 60px;
    }
    img:hover {
      border: 1px solid #3177b4;
      transform: scale(1.1);
    }
    p {
      margin: 0;
      font-size: 16px;
      color: #666;
      text-align: center;
      width: 65px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
