
import Hammer from './hammer'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

let utils

const directive = {
  attach: function ({ el, name, node, instance, directives }) {

    let { $hammer } = el
    if (!$hammer) {
      $hammer = el.$hammer = new Hammer.Manager(el)
    }

    // 读取配置项
    let { options } = directives
    if (options) {
      options = options.node.getValue()
      options = utils.is.string(options)
        ? (new Function(`return ${options}`))()
        : options
    }
    $hammer.add(new Hammer[capitalize(name)](options))

    if (options && options.event) {
      name = options.event
    }

    let listener = instance.compileAttr(node.keypath, node.getValue())
    $hammer.on(
      name,
      function (event) {
        return listener.call(this, new utils.Event(event))
      }
    )
  },
  detach: function (name, el) {
    el.$hammer.destroy()
    el.$hammer = null
  }
}

export const version = '0.0.7'

export let constant = { }

export function install(Yox) {
  utils = Yox.utils
  utils.array.each(
    [ 'tap', 'pan', 'pinch', 'press', 'rotate', 'swipe' ],
    function (name) {
      Yox.directive(name, directive)
    }
  )
  utils.object.each(
    Hammer,
    function (value, key) {
      if (key.indexOf('_') > 0) {
        constant[key] = value
      }
    }
  )
}

// 如果全局环境已有 Yox，自动安装
if (typeof Yox !== 'undefined' && Yox.use) {
  Yox.use(Router)
}
