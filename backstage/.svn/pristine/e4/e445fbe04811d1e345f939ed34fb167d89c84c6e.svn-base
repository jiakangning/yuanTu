<template>
  <run-work :options="options"></run-work>
</template>

<script>
  /**
   * @author 李少华
   * @date 2019-03-19
   */
  import Run from "run"
  import { system_error_log as LOG } from "@/store/action-types.js"

  export default {
    name: "system-errorlog",
    data() {
      return {
        options: null,
        sources: new Run.Source()
      }
    },
    created() {
      this.options = new Run.Work({
        config: {
          title: "错误日志管理"
        },
        actions: ["delete"],
        list: ["scale:text", "subject", "description", "author", "creation_date"],
        form: ["scale", "subject", "description", "author", "creation_date"],
        search: {
          layout: "multiple",
          columns: ["scale", "creation_date", "author"]
        },
        columns: [
          { label: "错误级别", field: "scale", layout: "select", source: "level" },
          { label: "错误信息", field: "subject", layout: "text" },
          { label: "详细信息", field: "description", layout: "text" },
          { label: "操作人", field: "author", layout: "text" },
          { label: "操作时间", field: "creation_date", layout: "date" }
        ],
        events: {
          loading: (store, done) => {
            const level = [
              {
                label: "debug",
                value: "debug"
              },
              {
                label: "info",
                value: "info"
              },
              {
                label: "warn",
                value: "warn"
              },
              {
                label: "error",
                value: "error"
              },
              {
                label: "fatal",
                value: "fatal"
              }
            ]
            this.sources.set("level", level)
            done()
          },
          search: params => {
            this.$store
              .dispatch(LOG.search, params)
              .then(({ rows, count }) => {
                this.sources.set("rows", rows)
                this.sources.set("count", count)
              })
          },
          delete: (rows, done) => {
            this.$store
              .dispatch(LOG.delete, rows.map(v => v.id))
              .then(() => done())
              .catch(done)
          }
        },
        sources: this.sources
      })
    }
  }
</script>
