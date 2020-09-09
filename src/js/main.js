import 'app/index';
import '../scss/main.scss';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const features = document.querySelectorAll('.feature');

// const loader = document.querySelector('.loader');

// const aboutText = document.querySelector('.general-info');

const observer = new IntersectionObserver((sections) => {
  sections.forEach((section) => {
    if (section.intersectionRatio > 0.4) {
      section.target.classList.add('show-feature');
    } else {
      section.target.classList.remove('show-feature');
    }
  });
}, { threshold: 0.4 });

features.forEach((feature) => observer.observe(feature));

// window.onload = () => {
//   // loader.classList.remove('loader-off');
// };

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.smooth-scroll'),
  smooth: true,
});

locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('.smooth-scroll', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0, left: 0, width: window.innerWidth, height: window.innerHeight,
    };
  },
  pinType: document.querySelector('.smooth-scroll').style.transform ? 'transform' : 'fixed',
});

gsap.fromTo('.general-info', {
  opacity: 0,
  y: -100,
  duration: 1,
},
{
  opacity: 1,
  y: 100,
  duration: 1,
});

gsap.fromTo('.photo-container', {
  opacity: 0,
  x: -100,
  duration: 1,
},
{
  opacity: 1,
  x: 0,
  duration: 1,
});

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

ScrollTrigger.refresh();
