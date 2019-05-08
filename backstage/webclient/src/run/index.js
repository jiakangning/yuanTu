// class
import PopupSearch from './model/PopupSearch.js'
import ChartWidge from './model/ChartWidge.js'
import ChartCard from './model/ChartCard.js'
import Chart from './model/Chart.js'
import List from './model/List.js'
import Form from './model/Form.js'
import Source from './model/Source.js'
import Search from './model/Search.js'
import Relation from './model/Relation.js'
import Work from './model/Work.js'
// component
import cascader from './cascader'
import select from './select'
import option from './option'
import column from './column'
import form from './form'
import list from './list'
import search from './search'
import work from './work'
import chart from './chart'
import chartWidge from './chartWidge'
import chartCard from './chartCard'
import popupSearch from './popupSearch'
import layer from './layer'

const components = [
  cascader,
  select,
  option,
  column,
  form,
  list,
  search,
  work,
  chart,
  chartWidge,
  chartCard,
  popupSearch,
  layer
]

const install = (Vue) => components.forEach(item => Vue.component(item.name, item))

export default {
  ChartCard,
  ChartWidge,
  PopupSearch,
  Chart,
  Form,
  List,
  Search,
  Work,
  Source,
  Relation,
  install
}
