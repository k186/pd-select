<template>
  <div style="position: fixed;bottom: 0;width: 100%">
    <select-item :listData="listData" type="line" v-model="month"></select-item>
  </div>
</template>
<script>
  import selectItem from './selectitem.vue'
  export default{
    name: 'pdIosSelect',
    data () {
      return {
        listData: Array.from({length: 24}, (value, index) => 0 + index),
        month: 0
      }
    },
    components: {
      selectItem
    }
  }
</script>
