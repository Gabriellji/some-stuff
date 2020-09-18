import state from './state';

const stateSetterAdapter = {
  state,

  setOptions(locale) {
    this.state.setter('control.lang', locale);
    window.localStorage.setItem('options', JSON.stringify({
      lang: locale,
    }));
  },

  setLang(locale) {
    this.state.setter('control.lang', locale);
    window.localStorage.setItem('options', JSON.stringify({
      lang: locale,
    }));
  },

  setI18nText(lang) {
    const langKeys = Object.keys(lang);
    langKeys.forEach((key) => {
      this.state.setter(`i18n.${key}`, lang[key]);
    });
  },
};

export default stateSetterAdapter;
