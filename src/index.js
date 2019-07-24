import * as qrcode from 'qrcode'

const QrcodeVue = {
  render(createElement) {
    const { className, value, level, background, foreground, size } = this

    return createElement(
      'div',
      {
        class: className,
        attrs: { value, level, background, foreground },
      },
      [
        createElement(
          'canvas',
          {
            attrs: { height: size, width: size },
            style: { width: size + 'px', height: size + 'px' },
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
      validator: (s) => isNaN(Number(s)) !== true,
    },
    level: {
      type: String,
      default: 'L',
      validator: (l) => ['L', 'Q', 'M', 'H'].indexOf(l) > -1,
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
    render() {
      const { value, size, level, background, foreground } = this

      const canvas = this.$refs['qrcode-vue']

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
  updated() {
    this.render()
  },
  mounted() {
    this.render()
  },
}

export default QrcodeVue
