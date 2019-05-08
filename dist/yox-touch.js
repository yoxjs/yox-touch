/**
 * yox-touch.js v0.10.0
 * (c) 2017-2019 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.YoxTouch = {}));
}(this, function (exports) { 'use strict';

  var Hammer = typeof require === 'function'
      ? require('hammerjs')
      : window.Hammer;

  if (!Hammer) {
    throw new Error('[yox-touch] cannot locate Hammer.js.')
  }

  /**
   * 版本
   *
   * @type {string}
   */
  var version = "0.10.0";

  function install(Yox) {

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
          on: function on(node, listener) {
            var hammer = node.$hammer || (node.$hammer = new Hammer(node));
            hammer.on(Yox.string.lower(name), listener);
          },
          off: function off(node, listener) {
            var hammer = node.$hammer;
            hammer.off(Yox.string.lower(name), listener);
            if (Yox.object.falsy(hammer.handlers)) {
              hammer.destroy();
              node.$hammer = null;
            }
          }
        };
      }
    );

  }

  // 如果全局环境已有 Yox，自动安装
  if (typeof Yox !== 'undefined' && Yox.use) {
    install(Yox);
  }

  exports.install = install;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=yox-touch.js.map
