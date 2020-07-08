class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
}

class MyVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.$data
    this.$options = options
    if (this.$el) {
      new Compile(this.$el, this)
    }
  }
}