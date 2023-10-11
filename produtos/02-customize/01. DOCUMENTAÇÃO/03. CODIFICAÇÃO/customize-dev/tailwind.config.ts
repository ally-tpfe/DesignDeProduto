import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'customize-bg': '#00326f',
        'title-bg': 'rgba(255, 255, 255, 0.06)',
        'title-color': '#414141',
        'icon-blue': '#01397E',
        'button-blue': '#0067FF',
        'button-hover': '#267eff',
        'nav-item-color': '#2762aa',
        'azul-escuro': '#002F62',
        'azul-claro': '#0067FF',
        'cinza-personalizado': 'rgba(255, 255, 255, 0.02)',
        'blue-light': 'rgba(0, 41, 255, 0.25)',
        'black-light': 'rgba(0, 0, 0, 0.25)',

        regular: {
          'azul-escuro': '#002F62',
          'azul-claro': '#0067FF',
          'customize-bg': '#00326f',
        },
        dark: {
          'customize-bg-dark': '#353535',
        },
        alternative: {
          'customize-bg-alternative': '#ad4525',
        },
      },
      width: {
        gigante: '19720.2px',
      },
      height: {
        gigante: '5386.23px',
      },
      boxShadow: {
        'custom-blue': '2px 2px 5px 0px rgba(130, 180, 255, 0.25) inset',
        'custom-black': '0px 0px 90px 0px rgba(0, 0, 0, 0.25)',
        'inner-custom':
          'inset 0 0 5px 0 rgba(0, 41, 255, 0.25), 0 0 90px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        segoeUi: 'Segoe UI, sans-serif',
      },
    },
  },
  plugins: [],
}
export default config
