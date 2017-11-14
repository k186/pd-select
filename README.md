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
推荐使用npm 的安装方式,它能更好的和webpack打包工具配合使用。
```
npm i pd-select -S

```
###CDN
目前可以通过 unpkg.com/pd-select 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用
```
 <!-- 引入样式 -->
 <link rel="stylesheet" href="https://unpkg.com/pd-select/dist/pdSelect.css">
 <!-- 引入组件库 -->
 <script src="https://unpkg.com/pd-select/dist/pdSelect.js"></script>
```

我们建议使用 CDN 引入 pd-select 的用户在链接地址上锁定版本，以免将来 pd-select 升级时受到非兼容性更新的影响。锁定版本的方法请查看 unpkg.com。


###Hello world
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- 引入样式 -->
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
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
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
