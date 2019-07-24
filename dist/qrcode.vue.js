'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var qrcode = _interopRequireWildcard(require('qrcode'))

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {}
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc)
          } else {
            newObj[key] = obj[key]
          }
        }
      }
    }
    newObj.default = obj
    return newObj
  }
}

var QrcodeVue = {
  render: function render(createElement) {
    var className = this.className,
      value = this.value,
      level = this.level,
      background = this.background,
      foreground = this.foreground,
      size = this.size
    return createElement(
      'div',
      {
        class: className,
        attrs: {
          value: value,
          level: level,
          background: background,
          foreground: foreground,
        },
      },
      [
        createElement(
          'canvas',
          {
            attrs: {
              height: size,
              width: size,
            },
            style: {
              width: size + 'px',
              height: size + 'px',
            },
            ref: 'qrcode-vue',
          },
          []
        ),
      ]
    )
  },
  props: {
    value: {
      type: undefined,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 100,
      validator: function validator(s) {
        return isNaN(Number(s)) !== true
      },
    },
    level: {
      type: String,
      default: 'L',
      validator: function validator(l) {
        return ['L', 'Q', 'M', 'H'].indexOf(l) > -1
      },
    },
    background: {
      type: String,
      default: '#fff',
    },
    foreground: {
      type: String,
      default: '#000',
    },
  },
  methods: {
    render: function render() {
      var value = this.value,
        size = this.size,
        level = this.level,
        background = this.background,
        foreground = this.foreground
      var canvas = this.$refs['qrcode-vue']
      qrcode.toCanvas(
        canvas,
        value,
        {
          errorCorrectionLevel: level,
          width: Number(size),
          color: {
            dark: foreground,
            light: background,
          },
        },
        function(error) {
          if (error) {
            console.error(error)
            throw error
          }
        }
      )
    },
  },
  updated: function updated() {
    this.render()
  },
  mounted: function mounted() {
    this.render()
  },
}
var _default = QrcodeVue
exports.default = _default
