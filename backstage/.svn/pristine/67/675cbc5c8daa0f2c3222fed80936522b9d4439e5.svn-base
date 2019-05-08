<script type="text/ecmascript-6">
  import { Cascader } from 'element-ui'

  const pinyinMatch = require('pinyin-match')

  export default {
    name: "run-cascader",
    extends: Cascader,
    methods: {
      handleInputChange(value) {
        if (!this.menuVisible) return
        const flatOptions = this.flatOptions
        if (!value) {
          this.menu.options = this.options
          this.$nextTick(this.updatePopper)
          return
        }
        let filteredFlatOptions = flatOptions.filter(optionsStack => {
          return optionsStack.some(option => !!pinyinMatch.match(option[this.labelKey] + '', value + ''))
        })
        if (filteredFlatOptions.length > 0) {
          filteredFlatOptions = filteredFlatOptions.map(optionStack => {
            return {
              __IS__FLAT__OPTIONS: true,
              value: optionStack.map(item => item[this.valueKey]),
              label: this.renderFilteredOptionLabel(value, optionStack),
              disabled: optionStack.some(item => item[this.disabledKey])
            }
          })
        } else {
          filteredFlatOptions = [{
            __IS__FLAT__OPTIONS: true,
            label: this.t('el.cascader.noMatch'),
            value: '',
            disabled: true
          }]
        }
        this.menu.options = filteredFlatOptions
        this.$nextTick(this.updatePopper)
      },
      renderFilteredOptionLabel(inputValue, optionsStack) {
        return optionsStack.map((option, index) => {
          const label = option[this.labelKey]
          const res = pinyinMatch.match(label + '', inputValue + '')
          const node = res ? this.highlightKeyword(label, label.slice(res[0], res[1] + 1)) : label
          return index === 0 ? node : [' / ', node]
        })
      },
      highlightKeyword(label, keyword) {
        const h = this._c
        return label.split(keyword)
          .map((node, index) => index === 0 ? node : [
            h('span', {
              class: { 'el-cascader-menu__item__keyword': true },
              style: { color: 'red' }
            }, [this._v(keyword)]),
            node
          ])
      }
    }
  }
</script>
