(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.YoxTouch = global.YoxTouch || {})));
}(this, (function (exports) { 'use strict';

var Hammer = typeof require === 'function' ? require('hammerjs') : window.Hammer;

if (!Hammer) {
  throw new Error('[yox-touch] cannot locate Hammer.js.');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var is = void 0;
var object = void 0;
var Event = void 0;

var directive = {
  onattach: function onattach(_ref) {
    var el = _ref.el,
        name = _ref.name,
        node = _ref.node,
        instance = _ref.instance,
        directives = _ref.directives;
    var $hammer = el.$hammer;

    if (!$hammer) {
      $hammer = el.$hammer = new Hammer.Manager(el);
    }

    var globalOptions = options[name];

    var localOptions = directives.options;
    if (localOptions) {
      localOptions = localOptions.node.getValue();
      localOptions = is.string(localOptions) ? new Function('return ' + localOptions)() : localOptions;
    }

    var finalOptions = object.extend({}, globalOptions, localOptions);

    $hammer.add(new Hammer[capitalize(name)](finalOptions));

    if (finalOptions.event) {
      name = finalOptions.event;
    }

    var listener = instance.compileAttr(node.keypath, node.getValue());
    $hammer.on(name, function (event) {
      return listener.call(this, new Event(event));
    });
  },
  ondetach: function ondetach(name, el) {
    el.$hammer.destroy();
    el.$hammer = null;
  }
};

var version = '0.0.10';

var options = {};

function install(Yox) {
  var utils = Yox.utils;

  is = utils.is;
  object = utils.object;
  Event = utils.Event;

  utils.array.each(['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe'], function (name) {
    Yox.directive(name, directive);
  });
}

if (typeof Yox !== 'undefined' && Yox.use) {
  install(Yox);
}

exports.version = version;
exports.options = options;
exports.install = install;

Object.defineProperty(exports, '__esModule', { value: true });

})));
