
let Hammer = typeof require === 'function'
    ? require('hammerjs')
    : window.Hammer

if (!Hammer) {
  throw new Error('[yox-touch] cannot locate Hammer.js.')
}

let is, string, object, Event

/**
 * 首字母大写
 *
 * @param {string} str
 * @return {string}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + string.slice(str, 1)
}

function directive({ el, node, instance, directives }) {

  let { $hammer } = el
  if (!$hammer) {
    $hammer = el.$hammer = new Hammer.Manager(el)
  }

  // 全局配置
  let { name } = node
  let globalOptions = options[ name ]

  // 本地配置
  let localOptions = directives.options
  if (localOptions) {
    localOptions = localOptions.value
    localOptions = is.string(localOptions)
      ? (new Function(`return ${localOptions}`))()
      : localOptions
  }

  let finalOptions = object.extend({ }, globalOptions, localOptions)

  $hammer.add(
    new Hammer[ capitalize(name) ](finalOptions)
  )

  if (finalOptions.event) {
    name = finalOptions.event
  }

  let listener = instance.compileValue(node.keypath, node.value)
  $hammer.on(
    name,
    function (event) {
      return listener(new Event(event))
    }
  )

  return function () {
    el.$hammer.destroy()
    el.$hammer = null
  }
}

/**
 * 版本
 *
 * @type {string}
 */
export const version = '0.7.0'

/**
 * 全局默认配置，可用 o-options="{}" 进行覆盖
 *
 * @type {Object}
 */
export let options = { }

export function install(Yox) {

  is = Yox.is
  string = Yox.string
  object = Yox.object
  Event = Yox.Event

  Yox.array.each(
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
