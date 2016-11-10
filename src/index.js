
import Hammer from 'hammerjs'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

let Event
const gestures = [ 'tap', 'pan', 'pinch', 'press', 'rotate', 'swipe' ]

const directive = {
  attach: function ({ el, name, node, instance, directives }) {
    if (!el.$hammer) {
      el.$hammer = new Hammer.Manager(el)
    }

    let { options } = directives
    if (options) {
      options = (new Function(`return ${options.node.getValue()}`))()
    }
    let { $hammer } = el
    $hammer.add(new Hammer[capitalize(name)](options))

    if (options && options.event) {
      name = options.event
    }

    let listener = instance.compileAttr(node.keypath, node.getValue())
    $hammer.on(
      name,
      function (event) {
        return listener.call(this, new Event(event))
      }
    )
  },
  detach: function (name, el) {
    el.$hammer.destroy()
    el.$hammer = null
  }
}

export function install(Yox) {
  Event = Yox.Event
  gestures.forEach(function (gesture) {
    Yox.directive(gesture, directive)
  })
}
