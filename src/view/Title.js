import Widget from './Widget';
import en from '../i18n/en/translation';
import ru from '../i18n/ru/translation';

class Title extends Widget {
  constructor() {
    super();

    this.path = [
      'i18n',
      'i18n.main',
      'i18n.default',
    ];

    this.title = document.querySelector('.general-info h1');
  }

  draw() {
    if (this.isStateReady()) {
      this.title.innerHTML = '';
      this.wordsMaker();
    }
  }

  wordsMaker() {
    const currentLang = this.state.getter('control.lang');
    const span = document.createElement('span');
    span.classList.add('moving_text');

    const span2 = document.createElement('span');
    span2.classList.add('moving_text');
    // span2.textContent = en.main.title2;

    const span3 = document.createElement('span');
    span3.classList.add('moving_text');
    // span3.textContent = en.main.title3;

    const span4 = document.createElement('span');
    span4.classList.add('moving_text');
    // span4.textContent = en.main.title4;

    if (currentLang !== 'en') {
      span.textContent = ru.main.title;
      span2.textContent = ru.main.title2;
      span3.textContent = ru.main.title3;
      span4.textContent = ru.main.title4;
    } else {
      span.textContent = en.main.title;
      span2.textContent = en.main.title2;
      span3.textContent = en.main.title3;
      span4.textContent = en.main.title4;
    }

    this.title.appendChild(span);
    this.title.appendChild(span2);
    this.title.appendChild(span3);
    this.title.appendChild(span4);
  }
}

export default Title;
