import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { title: 'Painter SaaS', signOut: 'Sign out', language: 'Language' } },
  es: { translation: { title: 'Painter SaaS', signOut: 'Cerrar sesión', language: 'Idioma' } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
