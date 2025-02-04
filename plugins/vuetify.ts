// import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDateInput } from "vuetify/labs/VDateInput"

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VDateInput
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            // primary: colors.indigo.darken1,
            // secondary: '#424242',
            // accent: colors.teal.accent4,
            primary: "#212121",
            secondary: "#eeeeee",
            accent: "#f93647",
            orange: "#ff6622",
            blue: "#3f51b5",
            green: "#04b53b",
            brown: "#b45e06",
            info: "#d5bbfa",
            yellow: "#f9e05a",
          }
        }
      }
    },
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md,
      }
    },
    date: {
      locale: {
        'es-MX': {
          firstDayOfWeek: 0,
          masks: {
            input: 'DD/MM/YYYY',
            date: 'DD/MM/YYYY',
            time: 'HH:mm',
            datetime: 'DD/MM/YYYY HH:mm',
          },
        },
      },
    }
  })
  app.vueApp.use(vuetify)
})