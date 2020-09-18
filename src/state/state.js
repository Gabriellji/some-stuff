import eventMixin from '../mixins/eventMixin';

const state = {
  isReady: false,
  store: {
    i18n: {
      main: {},
      nav: {},
      fancyWeather: {},
      puzzle: {},
      landing: {},
      virtualKeyboard: {},
      movieSearch: {},
      englishForKids: {},
    },
    control: {
      langOptions: [],
      lang: 'en',
    },
  },

  setter(path, value) {
    if (path === '') {
      this.store = value;
      return;
    }
    const pathArr = path.split('.');
    pathArr.reduce((acc, key, idx, arr) => {
      if (typeof acc[key] !== 'object' || idx === arr.length - 1) {
        acc[key] = value;
      }
      return acc[key];
    }, this.store);

    if (this.isReady) {
      this.emit('stateUpdated', path);
    }
  },

  getter(path) {
    if (path === '') {
      return this.store;
    }
    const pathArr = path.split('.');
    return pathArr.reduce((acc, key) => acc[key], this.store);
  },

  ready() {
    this.isReady = true;
    this.emit('stateReady');
  },
};

Object.assign(state, eventMixin);

export default state;
