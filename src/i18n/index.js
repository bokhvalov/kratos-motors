import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pl from '../locales/pl.json'
import en from '../locales/en.json'
import ru from '../locales/ru.json'
import { serviceModalDetailsByLang } from '../locales/serviceModalDetails'

function withServiceModalDetails(json, lang) {
  const add = serviceModalDetailsByLang[lang]
  if (!add || !json.pages?.services) return json
  return {
    ...json,
    pages: {
      ...json.pages,
      services: {
        ...json.pages.services,
        modalIncludes: add.modalIncludes,
        detail: add.detail,
      },
    },
  }
}

const resources = {
  pl: { translation: withServiceModalDetails(pl, 'pl') },
  en: { translation: withServiceModalDetails(en, 'en') },
  ru: { translation: withServiceModalDetails(ru, 'ru') },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
