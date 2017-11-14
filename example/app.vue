<template>
  <div>
    <div>pickedValue: {{month}}</div>
    <div>pickedValue: {{day}}</div>
    <pd-select-box style="position: fixed;bottom: 0;width: 100%">
      <pd-select-item :listData="listData" v-model="month"></pd-select-item>
      <pd-select-item :listData="listData2" type="cycle" v-model="day"></pd-select-item>
    </pd-select-box>
  </div>
</template>
<script>
  export default{
    name: 'app',
    data () {
      return {
        listData: Array.from({length: 12}, (value, index) => 1 + index),
        listData2: Array.from({length: 30}, (value, index) => 'customValue' + index),
        month: 100,
        day: 'customValue0'
      }
    }
  }
</script>
<style>
  @import "./resetCss/main.css";
  @import "../dist/pdSelect.css";
</style>
