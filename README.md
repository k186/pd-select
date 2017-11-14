[![npm](https://img.shields.io/npm/v/pd-select.svg)](https://www.npmjs.com/package/pd-select)


### [demo](https://www.k186studio.com/demos/iosPicker/)


Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
### install
```
npm i pd-select -S

```

### example
```
import pdSelect from 'pd-select'

Vue.use(pdSelect)

//other code

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

```


### props
```
  @param value {String} current select value or init value
  @param data {Array} loop array value
  @param type {String} 'cycle' ,default 'line'
```
 
   



### [how i build this](https://segmentfault.com/a/1190000009276918)
