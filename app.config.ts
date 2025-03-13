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
          'bg-light-blue-400 hover:bg-light-blue-450 text-dark-blue-950 text-lg border-0 rounded-full py-3 px-6 font-heading font-semibold focus:outline-none focus:ring-2 focus:ring-dark-blue-950 ',

        'action-icon-only':
          'bg-light-blue-400 hover:bg-light-blue-450 text-dark-blue-950 border-0 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-dark-blue-950  flex items-center justify-center'
      }
    }
  }
})
