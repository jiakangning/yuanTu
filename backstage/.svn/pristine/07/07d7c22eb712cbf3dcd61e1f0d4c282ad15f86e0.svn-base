import _ from 'lodash'
import bar from './bar'
import line from './line'
import pie from './pie'

const Category = {
  bar,
  line,
  pie
}

export default (category, option = {}, source = []) => _.get(Category, `${ category }.${ option.layout || 'simple' }`)(option, source)
