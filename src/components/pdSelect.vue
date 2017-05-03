<template>
  <div>
    <div>当前选中值:{{month}}</div>
    <div>当前选中值:{{day}}</div>
    <pd-select-box style="position: fixed;bottom: 0;width: 100%">
      <pd-select-item :listData="listData" v-model="month"></pd-select-item>
      <pd-select-item :listData="listData2" type="cycle" v-model="day"></pd-select-item>
    </pd-select-box>
  </div>
</template>
<script>
  import pdSelectItem from './selectitem.vue'
  import pdSelectBox from './slectBox.vue'
  export default{
    name: 'pdIosSelect',
    data () {
      return {
        listData: Array.from({length: 12}, (value, index) => 1 + index),
        listData2: Array.from({length: 30}, (value, index) => '文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试' + index),
        month: 100,
        day: '文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试0'
      }
    },
    components: {
      pdSelectItem,
      pdSelectBox
    }
  }
</script>
