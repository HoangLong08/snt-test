import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { HOME_EN, HOME_FR } from './locales'

const lang = 'en'
// console.log("lang: ", lang);
export const locales = [
  {
    key: 'en-US',
    title: 'English',
    lang: 'en-US'
  },
  {
    key: 'fr-FR',
    title: 'French',
    lang: 'fr-FR'
  }
]

const resources = {
  en: {
    home: HOME_EN
  },
  fr: {
    home: HOME_FR
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: 'vi', // use en if detected lng is not available
    ns: ['home'], // ns:nameSpace
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
