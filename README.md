# yox-touch

## Install

NPM

```shell
npm install yox-touch
```

CDN

```html
<script src="https://unpkg.com/yox-touch@latest"></script>
```

## Usage

```javascript
// 注册插件
Yox.use(YoxTouch)
```

`yox-touch` 基于指令封装了 [hammerjs](http://hammerjs.github.io/)，理论上拥有 `hammerjs` 所有的功能。


简单用法

```html
<button @tap="tap()">
  Tap
</button>
<button @tap="press()">
  Press
</button>
```

高级用法（配置项请参考 hammerjs 文档）

```html
<button @tap="tap()" @options="{event: 'tap'}">
  Tap
</button>
<button @tap="press()" @options="{event: 'press'}">
  Press
</button>
```