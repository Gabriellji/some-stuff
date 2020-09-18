import Buttons from './Buttons';
import Title from './Title';

class View {
  constructor() {
    this.buttons = new Buttons();
    this.title = new Title();
  }
}

export default View;
