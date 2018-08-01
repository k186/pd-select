[![npm](https://img.shields.io/npm/v/pd-select.svg)](https://www.npmjs.com/package/pd-select)


### [demo](https://www.k186studio.com/demos/iosPicker/)

| browser       | version       |
| ------------- |:-------------:|
| IE            | >11           |
| Edg           | >=16          |
| Firefox       | >=57          |
| chrome        | >=47          |
| safari        | >=11          |
| iOS Safari    | >=9.3         |
| Chrome for Android    | >=62         |
| Samsung Internet    | >=6.2         |


Build Setup

```
# install dependencies
npm install

# run dev
npm run dev

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


### todo 2.0
支持 点击

touch 事件换hammerjs

~~webapack 构建~~

~~极限 缓动~~
