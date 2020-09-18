import state from './state';

const stateGetterAdapter = {
  state,

  getOptions() {
    return {
      lang: this.state.getter('control.lang'),
    };
  },

  getLang() {
    return this.state.getter('control.lang');
  },

};

export default stateGetterAdapter;
