<template>
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
</template>
<script>
  /*
   * selectItem components
   *
   * @param value {String} current select value or default value
   * @param data {Array} loop array value
   * @param type {String} 'cycle' ,another 'line'
   *
   * */
  export default{
    name: 'pdSelectItem',
    data () {
      return {
        spin: {start: 0, end: 9, branch: 9},
        finger: {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0}
      }
    },
    props: {
      listData: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'line'
      },
      value: {}
    },
    computed: {
      renderData () {
        let temp = []
        for (let k = this.spin.start; k <= this.spin.end; k++) {
          let data = {
            value: this.getSpinData(k),
            index: k
          }
          temp.push(data)
        }
        return temp
      }
    },
    mounted () {
      /* setTimeout(() => {
       this.$emit('input', 10)
       }) */

      /* 判断 cycle 还是line */
      if (this.type === 'line') {
        this.spin = {start: -9, end: 9, branch: 9}
      } else {
        this.spin = {start: -9, end: 9, branch: 9}
      }
      /* 事件绑定 */
      this.$el.addEventListener('touchstart', this.itemTouchStart)
      this.$el.addEventListener('touchmove', this.itemTouchMove)
      this.$el.addEventListener('touchend', this.itemTouchEnd)
      /* 初始化状态 */
      // this.setWheelDeg(this.listData.indexOf(this.value))
      this.setListTransform()
    },
    methods: {
      /* 根据type 控制滚轮显示效果 */
      setHidden (index) {
        if (this.type === 'line') {
          return index < 0 || index > this.listData.length - 1
        } else {
          return false
        }
      },
      setWheelItemDeg (index) {
        return {
          transform: `rotate3d(1, 0, 0, ${-index * 20 % 360}deg) translate3d(0px, 0px, 100px)`
        }
      },
      setWheelDeg (updateDeg) {
        this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
      },
      setListTransform (translateY = 0, marginTop = 0) {
        this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
        this.$refs.list.style.marginTop = `${-marginTop}px`
        this.$refs.list.setAttribute('scroll', translateY)
      },
      itemTouchStart (event) {
        let finger = event.changedTouches[0]
        this.finger.startY = finger.pageY
        this.finger.startTime = event.timestamp || Date.now()
        // this.finger.transformY = this.$refs.list.style.transform.replace(/[^0-9\-,]/g, '').split(',')[0]
        this.finger.transformY = this.$refs.list.getAttribute('scroll')
      },
      itemTouchMove (event) {
        let finger = event.changedTouches[0]
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        /* 设置css */
        // todo
        let move = this.finger.lastY - this.finger.startY
        this.setStyle(move)
        event.preventDefault()
      },
      itemTouchEnd (event) {
        let finger = event.changedTouches[0]
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        /* 设置css */
        // todo
      },
      /* 设置css */
      setStyle (move, type) {
        // let time = this.finger.startTime - this.finger.lastTime
        const singleHeight = 34
        const singleDeg = 20 / singleHeight
        let currentListMove = this.finger.transformY
        let updateMove = move + Number(currentListMove)
        let updateDeg = -updateMove * singleDeg
        let spinAim = Math.round(updateDeg / 20)
        let margin = Math.round(updateMove / singleHeight) * singleHeight // 如果不这么写 会导致没有滚动效果
        this.setListTransform(updateMove, margin)
        this.setWheelDeg(updateDeg)
        this.updateSpin(spinAim)
      },
      /* 更新spin */
      updateSpin (spinAim) {
        this.spin.start = this.spin.branch * -1 + spinAim
        this.spin.end = this.spin.start + this.spin.branch * 2
      },
      /* 获取spin 数据 */
      getSpinData (index) {
        index = index % this.listData.length
        return this.listData[index >= 0 ? index : index + this.listData.length]
      }
    },
    beforeDestroy () {
      this.$el.removeEventListener('touchstart', this.itemTouchStart)
      this.$el.removeEventListener('touchmove', this.itemTouchMove)
      this.$el.removeEventListener('touchend', this.itemTouchEnd)
    }
  }
</script>
<style lang="scss">
  html {
    font-family: 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'STHeitiSC-Light', 'Arial', sans-serif;
    line-height: 1.8;
  }

  $color-background: #fff;
  $color-checked: #2c97f1;
  $color-text-main: #333;
  $color-text-second: #a8a8a8;
  .pd {
    &-select {
      &-item {
        overflow: hidden;
        width: 100%;
        text-align: center;
        height: 220px;
        background: $color-background;
      }
      &-ul {
        position: relative;
      }
      &-line, &-list, &-wheel {
        position: absolute;
        left: 0;
        right: 0;
        top: 93px;
      }
      &-line {
        z-index: 3;
      }
      &-list {
        z-index: 2;
        background: $color-background;
      }
      &-wheel {
        z-index: 1;
      }
      &-line {
        &:after, &:before {
          position: absolute;
          top: 0;
          content: '';
          display: table;
          background: $color-checked;
          width: 100%;
          height: 2px;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
        &:before {
          bottom: -1px;
          top: auto;
        }
      }
      &-line, &-list {
        height: 34px;
        transform: translate3d(0px, 0px, 110px);
      }
      &-list {
        overflow: hidden;
      }
      &-list-item {
        text-shadow: 0 1px 1px rgba(102, 102, 102, 0.6);
      }
      &-list-item, &-wheel-item {
        line-height: 34px;
        font-size: 18px;
        color: $color-text-main;
        &.hidden {
          visibility: hidden;
          opacity: 0;
        }
      }
      &-wheel {
        transform-style: preserve-3d;
        height: 34px;
        &-item {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          width: 100%;
          color: $color-text-second;
        }
      }
    }
  }
</style>
