# yox-touch

`yox-touch` 基于指令封装了 [hammerjs](http://hammerjs.github.io/)，理论上拥有 `hammerjs` 所有的功能。

## Install

NPM

```shell
npm install yox
npm install yox-touch
```

```javascript
import Yox from 'yox'
import YoxTouch from 'yox-touch'
Yox.use(YoxTouch)
```

CDN

```html
<script src="https://cdn.staticfile.org/hammer.js/2.0.8/hammer.min.js"></script>
<script src="https://unpkg.com/yox@latest"></script>
<script src="https://unpkg.com/yox-touch@latest"></script>
```

## Usage


```javascript
{
    methods: {
        tap: function () {

        },
        press: function () {

        }
    }
}
```

简单用法

```html
<button o-tap="tap()">
  Tap
</button>
<button o-tap="press()">
  Press
</button>
```

高级用法

```html
<button o-tap="tap()" o-options="{event: 'tap'}">
  Tap
</button>
<button o-tap="press()" o-options="{event: 'press'}">
  Press
</button>
```

`options` 指令使用的配置项请参考 [hammerjs 文档](http://hammerjs.github.io/)
