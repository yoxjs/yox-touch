
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

/**
 * 支持的事件，即 on-double-tap 支持的写法
 *
 * @type {string}
 */
export const events = [
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

  'panStart',
  'panMove',
  'panEnd',
  'panCancel',
  'panLeft',
  'panRight',
]

export function install(Yox) {

  Yox.array.each(
    events,
    function (name) {
      Yox.dom.addSpecialEvent(name, {
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
      })
    }
  )

}
