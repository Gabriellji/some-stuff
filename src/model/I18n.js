import state from '../state/state';
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const i18n = {
  state,

  getStaticText(locale = 'en') {
    const lang = require(`../i18n/${locale}/translation.js`);
    return lang;
  },
};

export default i18n;
