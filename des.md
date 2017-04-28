组件拆分，滚轮单独拆成一个组件


###滚轮部分主要dom结构
```html
<template>
  <div class="pd-select-item">
    <div class="pd-select-line"></div>
    <ul class="pd-select-list">
      <li class="pd-select-list-item">1</li>
    </ul>
    <ul class="pd-select-wheel">
      <li class="pd-select-wheel-item">1</li>
    </ul>
  </div>
</template>
```
###props
```json
 props: {
      data: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'cycle'
      },
      value: {}
    }
```
###设置css样式 使其垂直居中
```css
.pd-select-line, .pd-select-list, .pd-select-wheel {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.pd-select-list {
    overflow: hidden;
}
```
###滚轮3d样式设置
```css
/* 滚轮盒子 */
.pd-select-wheel {
    transform-style: preserve-3d;
    height: 30px;
}
/* 滚轮单项 */
.pd-select-wheel-item {
    white-space: nowrap;
    text-overflow: ellipsis;
    backface-visibility: hidden;
    position: absolute;
    top: 0px;
    width: 100%;
    overflow: hidden;
}
```

主要注意2个属性 ` transform-style: preserve-3d;` `  backface-visibility: hidden;`
第一个是3d布局，让界面3化，第二个是让滚轮背后自动隐藏

###如何实现3D 滚轮 （这里需要插图说明）
盒子主要这句css `transform: rotate3d(1, 0, 0, x deg);`
item主要运用这句css `transform: rotate3d(1, 0, 0, xdeg) translate3d(0px, 0px, 75px);`

行高 和角度计算
已知两边和夹角 算第三边长度 ~=34px 
http://tool.520101.com/calculator/sanjiaoxingjiaodu/

###无限滚轮实现
```javascript
/* 滚轮展示大小限定 */
spin: {start: 0, end: 9, branch: 9}

/* 获取spin 数据 */
 getSpinData (index) {
   index = index % this.listData.length
   return this.listData[index >= 0 ? index : index + this.listData.length]
 }
 /* 模运算 获取数组有的索引 这样就构成 圆环了 */
```
