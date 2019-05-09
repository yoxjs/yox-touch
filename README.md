# yox-touch

`yox-touch` 基于指令封装了 [hammerjs](http://hammerjs.github.io/)，理论上拥有 `hammerjs` 所有的功能。

## Install

NPM

```shell
npm install yox
npm install yox-touch
npm install hammerjs
```

```js
import Yox from 'yox'
import YoxTouch from 'yox-touch'
Yox.use(YoxTouch)
```

CDN

```html
<script src="https://unpkg.com/hammerjs@latest"></script>
<script src="https://unpkg.com/yox@latest"></script>
<script src="https://unpkg.com/yox-touch@latest"></script>
<script>
  // 必须手动注册，因为支持注册前进行事件扩展
  Yox.use(YoxTouch)
</script>
```

## Usage

```html
<div>
  <button on-tap="tap()">
    Tap
  </button>
  <button on-double-tap="doubleTap()">
    Double Tap
  </button>
</div>
```

```js
{
  methods: {
    tap: function () {

    },
    doubleTap: function () {

    }
  }
}
```

## 扩展

```js
// yox-touch 内置了 hammer 的默认事件，如果需要修改，请参考下面两个步骤：
// 1. 设置 hammer 支持的事件，event 是小写格式
Hammmer.default.presets = [
  [Hammmer.Tap],
  [Hammmer.Tap, {event: 'doubletap', taps: 2}, ['tap']],
]
// 2. 设置 yox-touch 的事件，事件名是驼峰格式
// 注意，需要先清空 events 数组，但不可改变 events 的引用，否则内部获取不到该数组
YoxTouch.events.length = 0
YoxTouch.events.push('tap', 'doubleTap')

// 注册
Yox.use(YoxTouch)
```

更多内容，请参考 [hammerjs 文档](http://hammerjs.github.io/)
