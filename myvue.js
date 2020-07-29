const complieUtil = {
  text(node, expr, vm) {

  },
  html(node, expr, vm) {
    
  },
  model(node, expr, vm) {
    
  }
}
class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    const fragment = this.node2Fargment(this.el)
    this.compile(fragment)
    this.el.appendChild(fragment)
  }

  compile(fragment) {
    const { childNodes } = fragment;
    [...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        // 元素
        this.compileElement(child)
      } else {
        // 文本
        this.compileText(child)
      }

      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }

  compileElement(node) {
    const { attributes } = node;
    [...attributes].forEach((attr) => {
      const { name, value } = attr
      if(this.isDirective(name)){
        const [,directive] = name.split('-')
        const [dirName, eventName] = directive.split(':')
        complieUtil[dirName](node, value, this.vm, eventName)
      }
    })
  }

  compileText(text) {
    
  }

  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  node2Fargment(el) {
    const f = document.createDocumentFragment()
    let firstChild
    while (firstChild = el.firstChild) {
      f.appendChild(firstChild)
    }
    return f
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