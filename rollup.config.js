import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify';

var minify = process.env.NODE_ENV === 'release'

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'YoxTouch',
  plugins: [
    babel({
      presets: [ 'es2015-rollup' ],
      babelrc: false,
      comments: false,
      runtimeHelpers: true
    }),
    (minify && uglify()),
  ],
  dest: minify ? 'dist/yox-touch.min.js' : 'dist/yox-touch.js'
}
