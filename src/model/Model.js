import i18n from './I18n';
import state from '../state/state';
import stateSetterAdapter from '../state/StateSetterAdapter';
import stateGetterAdapter from '../state/StateGetterAdapter';

const Model = {
  i18n,

  state,
  stateSetterAdapter,
  stateGetterAdapter,

  preInit() {
    let options = window.localStorage.getItem('options');
    if (options) {
      options = JSON.parse(options);
      this.stateSetterAdapter.setOptions(options.lang);
    } else {
      this.stateSetterAdapter.setOptions('en');
    }
    this.init();
  },

  init() {
    this.stateSetterAdapter.setI18nText(
      this.i18n.getStaticText(
        this.stateGetterAdapter.getLang(),
      ),
    );
    this.state.ready();
  },

  changeLang(locale) {
    this.stateSetterAdapter.setLang(locale);
    this.stateSetterAdapter.setI18nText(
      this.i18n.getStaticText(locale),
    );
  },
};

export default Model;
