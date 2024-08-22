import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'customize-sidebar-background':
          'linear-gradient(175deg, #E5F0FF 0%, #FFF 22.4%, #FFF1EA 45.83%, #FFF 76.56%, #E5F0FF 100%)',
      },
      colors: {
        'customize-background-azul': '#00326F',
        'customize-text-azul': '#01397E',
        'customize-button-azul-claro': '#0067FF',
        'customize-nav-button-transparent-white': 'rgba(255, 255, 255, 0.1)',
        'customize-signature-form-background': 'rgba(255, 255, 255, 0.02)',
      },
      boxShadow: {
        'customize-button-shadow': '2px 2px 4px 0px #88C6FF inset',
        'customize-title-card-shadow':
          '2px 2px 5px 0px rgba(130, 180, 255, 0.25) inset, 0px 0px 90px 0px rgba(0, 0, 0, 0.25)',
        'customize-card-shadow':
          '0px 0px 90px 0px rgba(0, 0, 0, 0.25), 2px 2px 5px 0px rgba(89, 89, 89, 0.40) inset',
        'customize-sidebar-shadow':
          '2px 2px 5px 0px #5F5F5F inset, 0px 0px 90px 0px rgba(0, 0, 0, 0.20)',
        'customize-signature-form-shadow':
          '2px 2px 5px 0px rgba(185, 196, 255, 0.25) inset, 0px 0px 90px 0px rgba(0, 0, 0, 0.25)',
        'customize-bg-gallery-card-shadow':
          '2px 2px 5px 0px rgba(89, 89, 89, 0.40) inset',
        'customize-card-finish-shadow':
          '0px 0px 5px 0px rgba(0, 41, 255, 0.25) inset, 0px 0px 90px 0px rgba(0, 0, 0, 0.25)',
        'customize-sidebar-finish-shadow':
          '0px 0px 90px 0px rgba(0, 0, 0, 0.20), 2px 2px 5px 0px rgba(89, 89, 89, 0.40) inset',
      },
      width: {
        'app-frame-width': '80vw',
        'app-frame-width-lg': '80vw',
        'app-frame-max-width': '725px',
      },
      height: {
        'app-frame-height': '85vh',
        'app-frame-height-lg': '85vh',
        'app-frame-max-height': '700px',
      },
    },
  },
  plugins: [],
}
export default config
