
const Hammer = typeof require === 'function'
    ? require('hammerjs')
    : window.Hammer

if (!Hammer) {
  throw new Error('[yox-touch] cannot locate Hammer.js.')
}

/**
 * 版本
 *
 * @type {string}
 */
export const version = process.env.NODE_VERSION

export function install(Yox) {

  Yox.array.each(
    [
      'tap',
      'doubleTap',

      'press',
      'pressUp',

      'pinchStart',
      'pinchMove',
      'pinchEnd',
      'pinchCancel',
      'pinchIn',
      'pinchOut',

      'rotateStart',
      'rotateMove',
      'rotateEnd',
      'rotateCancel',

      'swipeLeft',
      'swipeRight',
      'swipeUp',
      'swipeDown',

      'panStart',
      'panMove',
      'panEnd',
      'panCancel',
      'panLeft',
      'panRight',
      'panUp',
      'panDown'

    ],
    function (name) {
      Yox.dom.specialEvents[name] = {
        on(node, listener) {
          const hammer = node.$hammer || (node.$hammer = new Hammer(node))
          hammer.on(Yox.string.lower(name), listener)
        },
        off(node, listener) {
          const hammer = node.$hammer
          hammer.off(Yox.string.lower(name), listener)
          if (Yox.object.falsy(hammer.handlers)) {
            hammer.destroy()
            node.$hammer = null
          }
        }
      }
    }
  )

}

// 如果全局环境已有 Yox，自动安装
if (typeof Yox !== 'undefined' && Yox.use) {
  install(Yox)
}
