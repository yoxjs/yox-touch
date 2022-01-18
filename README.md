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
import * as YoxTouch from 'yox-touch'
Yox.use(YoxTouch)
```

CDN

```html
<script src="https://unpkg.com/hammerjs@latest"></script>
<script src="https://unpkg.com/yox@latest"></script>
<script src="https://unpkg.com/yox-touch@latest"></script>
<script>
  // 必须手动注册
  YoxTouch.setHammer(window.Hammer)
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
  <button on-press="press()">
    Press
  </button>
  <button on-long-press="longPress()">
    Long Tap
  </button>
  <button on-swipe-left="swipeLeft()">
    swipeLeft
  </button>
  <button on-swipe-right="swipeRight()">
    swipeRight
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

更多内容，请参考 [hammerjs 文档](http://hammerjs.github.io/)
