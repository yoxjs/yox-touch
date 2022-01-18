
let Hammer

/**
 * 版本
 *
 * @type {string}
 */
export const version = process.env.NODE_VERSION

const NULL = null

function isEmptyHandlers(handlers) {
  let isEmpty = true
  if (handlers) {
    for (let key in handlers) {
      if (!Yox.array.falsy(handlers[key])) {
        isEmpty = false
        break
      }
    }
  }
  return isEmpty
}

/**
 * 支持的事件，即 on-double-tap 支持的写法
 *
 * @type {object}
 */
const events = {
  tap: NULL,
  doubleTap: NULL,

  press: NULL,
  pressUp: NULL,

  pinchStart: NULL,
  pinchMove: NULL,
  pinchEnd: NULL,
  pinchCancel: NULL,
  pinchIn: NULL,
  pinchOut: NULL,

  rotateStart: NULL,
  rotateMove: NULL,
  rotateEnd: NULL,
  rotateCancel: NULL,

  swipeLeft: NULL,
  swipeRight: NULL,

  panStart: NULL,
  panMove: NULL,
  panEnd: NULL,
  panCancel: NULL,
  panLeft: NULL,
  panRight: NULL,
}

export function setHammer(library) {
  Hammer = library
  // 默认扩展一个长按手势
  addGesture(
    'longPress',
    new Hammer.Press({
      event: 'longpress',
      time: 1000
    })
  )
}

export function addGesture(name, gesture) {
  const lowerName = name.toLowerCase()
  events[name] = {
    on(node, listener) {
      let manager = node.$manager

      if (!manager) {
        manager = node.$manager = new Hammer.Manager(node)
        manager.add(gesture)
      }

      manager.on(lowerName, listener)
    },
    off(node, listener) {
      const manager = node.$manager
      manager.off(lowerName, listener)
      if (isEmptyHandlers(manager.handlers)) {
        manager.destroy()
        node.$manager = NULL
      }
    }
  }
}

export function install(Yox) {

  Yox.object.each(
    events,
    function (customEvent, name) {
      const lowerName = name.toLowerCase()
      Yox.dom.addSpecialEvent(
        name,
        {
          on(node, listener) {
            if (customEvent && customEvent.on) {
              customEvent.on(node, listener)
            }
            else {
              const hammer = node.$hammer || (node.$hammer = new Hammer(node))
              hammer.on(lowerName, listener)
            }
          },
          off(node, listener) {
            if (customEvent && customEvent.off) {
              customEvent.off(node, listener)
            }
            else {
              const hammer = node.$hammer
              hammer.off(lowerName, listener)
              if (isEmptyHandlers(hammer.handlers)) {
                hammer.destroy()
                node.$hammer = NULL
              }
            }
          }
        }
      )
    }
  )

}
