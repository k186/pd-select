以前最早实现了一个类似的时间选择插件，但是适用范围太窄，索性最近要把这个实现方式发布出来，就重写了一个高复用的vue组件。

[效果预览](http://www.k186studio.com/demos/iosPicker/)

[gitHub](https://github.com/k186/iosSelect/tree/master)

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
![图片描述][1]

主要注意2个属性 ` transform-style: preserve-3d;` `  backface-visibility: hidden;`
第一个是3d布局，让界面3D化，第二个是让滚轮背后自动隐藏(上图红色部分,背面的dom节点 会自动隐藏)

###如何实现3D 滚轮
盒子主要这句css `transform: rotate3d(1, 0, 0, x deg);`
item主要运用这句css `transform: rotate3d(1, 0, 0, xdeg) translate3d(0px, 0px, [x]px);`

![图片描述][2]

![图片描述][3]
![图片描述][4]

上面2张图展示了`translate3d(0px, 0px, [x]px);`这句话的效果 `[x]`就是圆的半径

![图片描述][5]

从上面的图可以看见，我们只需旋转每个dom自身，然后利用`translate3d(0px, 0px, [x]px);`把每个dom扩展开
就形成了圆环.α就是每个dom自身旋转的角度，因为这里只用了0到180°，所以用了个盒子在装这些dom


行高 和角度计算

![图片描述][6]
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
###touchend做特殊处理

在touchend 里设置setCSS类型 把滚动数据取整，这样停止的时候就是
一格一格的准确转动到位
```javascript
 // other code ....
 /* 计算touchEnd移动的整数距离 */
        let endMove = margin
        let endDeg = Math.round(updateDeg / deg) * deg
        if (type === 'end') {
          this.setListTransform(endMove, margin)
          this.setWheelDeg(endDeg)
        } else {
          this.setListTransform(updateMove, margin)
          this.setWheelDeg(updateDeg)
        }
  // other code ....
```

###惯性缓动
```javascript
// other code ....
setWheelDeg (updateDeg, type, time = 1000) {
        if (type === 'end') {
          this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        } else {
          this.$refs.wheel.style.webkitTransition = ''
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        }
      }
setListTransform (translateY = 0, marginTop = 0, type, time = 1000) {
        if (type === 'end') {
          this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
          console.log('end')
        } else {
          this.$refs.list.style.webkitTransition = ''
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
        }
}
// other code ....
```
###获取当前选中值
```javascript

 /* 在设置完css后获取值  */
 
setStyle (move, type, time) {
   // ...other code
   /* 设置$emit 延迟 */
   setTimeout(() => this.getPickValue(endMove), 1000)
  // ...other code
}

/* 获取选中值 */
      getPickValue (move) {
        let index = Math.abs(move / 34)
        let pickValue = this.getSpinData(index)
        this.$emit('input', pickValue)
      }
```

###初始化设置
```javascript
 mounted () {
      /* 事件绑定 */
      this.$el.addEventListener('touchstart', this.itemTouchStart)
      this.$el.addEventListener('touchmove', this.itemTouchMove)
      this.$el.addEventListener('touchend', this.itemTouchEnd)
      /* 初始化状态 */
      let index = this.listData.indexOf(this.value)
      if (index === -1) {
        console.warn('当前初始值不存在，请检查后listData范围！！')
        this.setListTransform()
        this.getPickValue(0)
      } else {
        let move = index * 34
        /* 因为往上滑动所以是负 */
        this.setStyle(-move)
        this.setListTransform(-move, -move)
      }
```
###当展示为非无限滚轮的时
这里我们很好判断，就是滚动的距离不能超过原始数的数组长度*34，且不能小于0（实际代码中因涉及方向）
```javascript
 /* 根据type 控制滚轮显示效果 */
      setHidden (index) {
        if (this.type === 'line') {
          return index < 0 || index > this.listData.length - 1
        } else {
          return false
        }
      },
```
dom结构也增加了对应的响应
```html
<div class="pd-select-item">
    <div class="pd-select-line"></div>
    <div class="pd-select-list">
      <ul class="pd-select-ul" ref="list">
        <li class="pd-select-list-item" v-for="el,index in renderData " :class="{'hidden':setHidden(el.index)}" :key="index">{{el.value}}</li>
      </ul>
    </div>
    <ul class="pd-select-wheel" ref="wheel">
      <li class="pd-select-wheel-item" :class="{'hidden':setHidden(el.index)}" :style="setWheelItemDeg(el.index)" :index="el.index" v-for="el,index in renderData " :key="index">{{el.value}}</li>
    </ul>
  </div>
```

如有不明白的地方，请在下方留言，或者邮箱联系.k1868548@163.com
代码还有优化空间，欢迎提出 谢谢

  [1]: /img/bVM5sd
  [2]: /img/bVM5sy
  [3]: /img/bVM5s7
  [4]: /img/bVM5tb
  [5]: /img/bVM5tj
  [6]: /img/bVM5tm
