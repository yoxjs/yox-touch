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

  /**
   * 全局默认配置
   *
   * @type {Object}
   */
  var options = { };

  function install(Yox) {

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
          on: function on(node, listener) {
            var hammer = node.$hammer || (node.$hammer = new Hammer(node, options[name]));
            hammer.on(name, listener);
          },
          off: function off(node, listener) {
            var hammer = node.$hammer;
            hammer.off(name, listener);
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
  exports.options = options;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=yox-touch.js.map
