import * as qrcode from 'qrcode'
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

      var _size = size >>> 0 // size to number

      var canvas = this.$refs['qrcode-vue']
      qrcode.toCanvas(
        canvas,
        value,
        {
          errorCorrectionLevel: level,
          width: _size,
          color: {
            dark: background,
            light: foreground,
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
export default QrcodeVue
