you may have problem with sass-node,please try vpn if you are in china.

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
###CDN
```
 <!-- CSS -->
 <link rel="stylesheet" href="https://unpkg.com/pd-select/dist/pdSelect.css">
 <!-- JS LIB -->
 <script src="https://unpkg.com/pd-select/dist/pdSelect.js"></script>
```


###Hello world
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
   <!-- CSS -->
  <link rel="stylesheet" href="https://unpkg.com/pd-select/dist/pdSelect.css">
</head>
<body>
  <div id="app">
      <div>
          <div>pickedValue: {{month}}</div>
          <div>pickedValue: {{day}}</div>
          <pd-select-box style="position: fixed;bottom: 0;width: 100%">
              <pd-select-item :listData="listData" v-model="month"></pd-select-item>
              <pd-select-item :listData="listData2" type="cycle" v-model="day"></pd-select-item>
          </pd-select-box>
      </div>
  </div>
</body>
  <!-- vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- JS LIB -->
  <script src="https://unpkg.com/pd-select/dist/pdSelect.js"></script>
  <script>
    new Vue({
      el: '#app',
      data:{
         listData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
         listData2:['customValue0','customValue1','customValue2','customValue3','customValue4'],
         month: 100,
         day: 'customValue0'
       },
       components: {
        'pd-select-box': pdSelectItem.pdSelectItem,
        'pd-select-item': pdSelectBox.pdSelectBox
       }
    })
  </script>
</html>
```


###example
```
import pdSelect from 'pd-select'

Vue.use(pdSelect)


```


### props
```
  @param value {String} current select value or init value
  @param data {Array} loop array value
  @param type {String} 'cycle' ,default 'line'
```
 
   
### [demo](https://www.k186studio.com/demos/iosPicker/)


### [how i build this](https://segmentfault.com/a/1190000009276918)
