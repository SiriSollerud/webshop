export default defineAppConfig({
  ui: {
    primary: 'mid-blue',
    gray: 'slate',

    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif']
    },

    text: {
      base: 'text-dark-blue-950 font-sans',
      heading: 'text-mid-blue-800 font-heading'
    },

    button: {
      variant: {
        action:
          'bg-mid-blue-700 hover:bg-dark-blue-950 text-white text-lg border-0 rounded-full py-3 px-6 font-heading font-semibold focus:outline-none ring-offset-2  focus:ring-2 focus:ring-mid-blue-700 ',

        'action-icon-only':
          'bg-mid-blue-700 hover:bg-dark-blue-950 text-white border-0 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-mid-blue-700 ring-offset-2 flex items-center justify-center'
      },
      rounded: 'rounded-full'
    },
    breadcrumb: {
      base: 'cursor-pointer'
    }
  }
})
