<template>
  <div class="container" ref="container">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { debounce } from '../../utils'
export default {
  name: 'container',
  props: {
    options: Object
  },
  data() {
    return {
      ready: false,
      width: 0,
      height: 0,
      originalWidth: 0,
      orginalHeight: 0,
      dom: ''
    }
  },
  async mounted() {
    await this.initSize()
    this.updataSize()
    this.updataScale()

    window.addEventListener('resize', debounce(100, this.onResize))
    this.ready = true
  },
  methods: {
    initSize() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          this.dom = this.$refs.container
          if (this.options && this.options.width && this.options.height) {
            this.width = this.options.width
            this.height = this.options.height
          } else {
            this.width = this.dom.clientWidth
            this.height = this.dom.clientHeight
          }
          if (!this.originalWidth || !this.orginalHeight) {
            this.originalWidth = window.screen.width
            this.orginalHeight = window.screen.height
          }
          resolve()
        })
      })
    },
    updataSize() {
      if (this.width && this.height) {
        this.dom.style.width = `${this.width}px`
        this.dom.style.height = `${this.height}px`
      } else {
        this.dom.style.width = `${this.originalWidth}px`
        this.dom.style.height = `${this.orginalHeight}px`
      }
    },
    updataScale() {
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight

      // 获取大屏最后确定宽高
      const realWidth = this.width || this.originalWidth
      const realHeight = this.height || this.originalHeight

      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight
      this.dom.style.transform = `scale(${widthScale},${heightScale})`
    },
    async onResize() {
      await this.initSize()
      this.updataScale()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
