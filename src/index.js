
let Hammer = typeof require === 'function'
    ? require('hammerjs')
    : window.Hammer

if (!Hammer) {
  throw new Error('[yox-touch] cannot locate Hammer.js.')
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

let is, object, Event

const directive = {
  onattach: function ({ el, name, node, instance, directives }) {

    let { $hammer } = el
    if (!$hammer) {
      $hammer = el.$hammer = new Hammer.Manager(el)
    }

    // 全局配置
    let globalOptions = options[name]

    // 本地配置
    let localOptions = directives.options
    if (localOptions) {
      localOptions = localOptions.node.getValue()
      localOptions = is.string(localOptions)
        ? (new Function(`return ${localOptions}`))()
        : localOptions
    }

    let finalOptions = object.extend({ }, globalOptions, localOptions)

    $hammer.add(
      new Hammer[capitalize(name)](finalOptions)
    )

    if (finalOptions.event) {
      name = finalOptions.event
    }

    let listener = instance.compileAttr(node.keypath, node.getValue())
    $hammer.on(
      name,
      function (event) {
        return listener.call(this, new Event(event))
      }
    )
  },
  ondetach: function (name, el) {
    el.$hammer.destroy()
    el.$hammer = null
  }
}

/**
 * 版本
 *
 * @type {Object}
 */
export const version = '0.0.10'

/**
 * 全局默认配置，可用 o-options="{}" 进行覆盖
 *
 * @type {Object}
 */
export let options = { }

export function install(Yox) {

  let { utils } = Yox
  is = utils.is
  object = utils.object
  Event = utils.Event

  utils.array.each(
    [ 'tap', 'pan', 'pinch', 'press', 'rotate', 'swipe' ],
    function (name) {
      Yox.directive(name, directive)
    }
  )

}

// 如果全局环境已有 Yox，自动安装
if (typeof Yox !== 'undefined' && Yox.use) {
  install(Yox)
}
