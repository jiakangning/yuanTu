<script>
  import Search from '../../model/Search.js'
  import columnSingle from '../columns/single.vue'
  import columnGroup from '../columns/group.vue'
  import columnPopup from '../columns/popup.vue'

  export default {
    components: { columnSingle, columnGroup, columnPopup },
    props: {
      options: {}
    },
    computed: {
      currentColumns() {
        return this.options.getColumns()
      }
    },
    methods: {
      onSearch() {
        this.$emit(Search.EVENTS.search)
      },
      onInput() {
        this.$emit(Search.EVENTS.input)
      }
    }
  }
</script>
