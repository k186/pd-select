<template>
  <div id="app">
    <pd-select-box style="position: fixed;bottom: 0;width: 100%">
      <pd-select-item ref="month" :listData="listData" v-model="month"></pd-select-item>
      <pd-select-item ref="day" :listData="listData2" type="cycle" v-model="day"></pd-select-item>
    </pd-select-box>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        listData: Array.from({length: 12}, (value, index) => 1 + index),
        listData2: Array.from({length: 30}, (value, index) => 'customValue' + index),
        month: 100,
        day: 'customValue15'
      }
    },
    mounted(){
      setTimeout(()=>{
        //验证 model 联动
        this.after()
      },3000)
    },
    methods: {
      after () {
        this.day = 'customValue0'
        this.$refs.day.init()
      }
    }
  }
</script>
<style>
  body {
    margin: 0;
  }
</style>
