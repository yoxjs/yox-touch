
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
 * 全局默认配置
 *
 * @type {Object}
 */
export const options = { }

export function install(Yox) {

  Yox.array.each(
    [
      'tap',

      'press',
      'pressup',

      'pinchstart',
      'pinchmove',
      'pinchend',
      'pinchcancel',
      'pinchin',
      'pinchout',

      'rotatestart',
      'rotatemove',
      'rotateend',
      'rotatecancel',

      'swipeleft',
      'swiperight',
      'swipeup',
      'swipedown',

      'panstart',
      'panmove',
      'panend',
      'pancancel',
      'panleft',
      'panright',
      'panup',
      'pandown'

    ],
    function (name) {
      Yox.dom.specialEvents[name] = {
        on(node, listener) {
          const hammer = node.$hammer || (node.$hammer = new Hammer(node, options[name]))
          hammer.on(name, listener)
        },
        off(node, listener) {
          const hammer = node.$hammer
          hammer.off(name, listener)
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
