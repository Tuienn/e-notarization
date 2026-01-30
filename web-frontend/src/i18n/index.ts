import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import EN_HOME from './locales/en/home.json'
import EN_LAYOUT from './locales/en/layout.json'
import EN_AUTH from './locales/en/auth.json'
import EN_PERSONAL from './locales/en/personal.json'

export const resources = {
    en: { home: EN_HOME, layout: EN_LAYOUT, auth: EN_AUTH, personal: EN_PERSONAL }
}

export const defaultNS = 'home'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        defaultNS,
        ns: ['home', 'auth'],
        lng: 'en', // Force ngôn ngữ mặc định là 'en'
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    })

export default i18n
