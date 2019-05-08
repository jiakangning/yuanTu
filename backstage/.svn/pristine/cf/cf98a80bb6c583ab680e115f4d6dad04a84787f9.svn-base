<script type="text/ecmascript-6">
  import { Option } from 'element-ui'

  const pinyinMatch = require('pinyin-match')

  export default {
    name: "run-option",
    extends: Option,
    methods: {
      queryChange(query) {
        if (!this.currentLabel || !query) {
          this.visible = true
        } else {
          this.visible = (!!pinyinMatch.match(this.currentLabel + '', query + '')) || this.created
        }
        if (!this.visible) {
          this.select.filteredOptionsCount--
        }
      }
    }
  }
</script>
