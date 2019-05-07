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
```

## Usage


```js
{
  methods: {
    tap: function () {

    },
    press: function () {

    }
  }
}
```

```html
<button on-tap="tap()">
  Tap
</button>
<button on-tap="press()">
  Press
</button>
```

`options` 指令使用的配置项请参考 [hammerjs 文档](http://hammerjs.github.io/)
