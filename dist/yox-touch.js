(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.YoxTouch = global.YoxTouch || {})));
}(this, (function (exports) { 'use strict';

var Hammer = typeof require === 'function' ? require('hammerjs') : window.Hammer;

if (!Hammer) {
  throw new Error('[yox-touch] cannot locate Hammer.js.');
}

var is = void 0;
var object = void 0;
var Event = void 0;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function directive(_ref) {
  var el = _ref.el,
      node = _ref.node,
      instance = _ref.instance,
      directives = _ref.directives;
  var $hammer = el.$hammer;

  if (!$hammer) {
    $hammer = el.$hammer = new Hammer.Manager(el);
  }

  var name = node.name;

  var globalOptions = options[name];

  var localOptions = directives.options;
  if (localOptions) {
    localOptions = localOptions.value;
    localOptions = is.string(localOptions) ? new Function('return ' + localOptions)() : localOptions;
  }

  var finalOptions = object.extend({}, globalOptions, localOptions);

  $hammer.add(new Hammer[capitalize(name)](finalOptions));

  if (finalOptions.event) {
    name = finalOptions.event;
  }

  var listener = instance.compileValue(node.keypath, node.value);
  $hammer.on(name, function (event) {
    return listener(new Event(event));
  });

  return function () {
    el.$hammer.destroy();
    el.$hammer = null;
  };
}

var version = '0.6.0';

var options = {};

function install(Yox) {

  is = Yox.is;
  object = Yox.object;
  Event = Yox.Event;

  Yox.array.each(['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe'], function (name) {
    Yox.directive(name, directive);
  });
}

if (typeof Yox !== 'undefined' && Yox.use) {
  install(Yox);
}

exports.capitalize = capitalize;
exports.version = version;
exports.options = options;
exports.install = install;

Object.defineProperty(exports, '__esModule', { value: true });

})));
