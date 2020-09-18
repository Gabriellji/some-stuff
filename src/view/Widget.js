import state from '../state/state';
import stateGetterAdapter from '../state/StateGetterAdapter';
import model from '../model/Model';

class Widget {
  constructor() {
    this.model = model;
    this.state = state;
    this.stateGetterAdapter = stateGetterAdapter;

    this.state.on('stateUpdated', this.update.bind(this));
    this.state.on('stateReady', this.draw.bind(this));
  }

  update(path) {
    if (this.path.includes(path)) {
      this.draw();
    }
  }

  draw() {
    return this;
  }

  isStateReady() {
    return this.state.isReady;
  }
}

export default Widget;
