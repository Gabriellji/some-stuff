import Widget from './Widget';
import state from '../state/state';

class Buttons extends Widget {
  constructor() {
    super();
    this.state = state;

    this.path = [
      'control',
      'control.lang',
      'i18n',
      'i18n.default',
    ];

    this.buttonsPanel = document.querySelector('.button-panel');
  }

  draw() {
    this.buttonsPanel.innerHTML = '';
    this.createLanguageButtons();
  }

  createLanguageButtons() {
    const btnInnerText = ['en', 'ru'];
    const arrayLength = btnInnerText.length;
    let btn;

    for (let i = 0; i < arrayLength; i += 1) {
      btn = document.createElement('button');
      if (this.state.getter('control.lang') === btnInnerText[i]) {
        btn.classList.add('active');
      }
      btn.setAttribute('data-lang', btnInnerText[i]);
      btn.innerHTML = btnInnerText[i];

      btn.addEventListener('click', ((e) => {
        console.log('clicked');
        this.model.changeLang(e.target.getAttribute('data-lang'));
      }));

      this.buttonsPanel.appendChild(btn);
    }
  }
}

export default Buttons;
