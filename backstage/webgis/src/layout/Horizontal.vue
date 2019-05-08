<template>
  <div class="olBindMap">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.olBindMap {
  display: flex;
  text-align: center;
  height: 100%;
  overflow: hidden;
  div.left {
    min-width: 180px;
    width: 180px;
    border: 1px solid #ccc;
  }
  .content {
    flex: 1;
    background: #ccc;
    overflow: auto;
  }
}
</style>
