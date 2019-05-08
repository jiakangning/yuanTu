<template>
  <div class="page">
    <div class="wrap">
      <run-list
        class="list"
        v-if="options"
        :options="options"
        auto>
        <run-column
          position="list"
          after="serial"
          label="操作">
          <el-button
            v-if="scope"
            slot-scope="scope"
            size="mini"
            type="primary">详情
          </el-button>
        </run-column>
      </run-list>
    </div>
  </div>
</template>

<script>
  import Run from 'run'
  import Mock from 'mockjs'

  export default {
    data() {
      return {
        options: null,
        sources: new Run.Source()
      }
    },
    created() {
      this.options = new Run.List({
        sources: this.sources,
        columns: [
          { label: "名称", field: "name", layout: "text" },
          { label: "主管", field: "user", layout: "text" },
          { label: "序号", field: "serial", layout: "text" }
        ],
        config: {
          layout: "treegrid"
        },
        events: {
          search(params, done) {
            setTimeout(() => {
              const { rows } = Mock.mock({
                "rows|20": [{
                  "name": () => Mock.Random.cname(),
                  "id|+1": 1,
                  "parentId"() {
                    return this.id > 5 ? Mock.mock({ "id|1-5": 1 }).id : null
                  }
                }]
              })
              this.sources.set("rows", rows)
              done && done()
            }, 1000)
          }
        }
      })
      this.options.emit("search")
    }
  }
</script>

<style scoped>
.page {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.wrap {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
</style>