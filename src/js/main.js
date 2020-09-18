import 'app/index';
import '../scss/main.scss';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import * as THREE from 'three';

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

// USEFUL FUNCTIONS
function throttled(fn) {
  let didRequest = false;
  return (param) => {
    if (!didRequest) {
      requestAnimationFrame(() => {
        fn(param);
        didRequest = false;
      });
      didRequest = true;
    }
  };
}
function map(value, min1, max1, min2, max2) {
  return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}
function clamp(value, min = 0, max = 1) {
  /* eslint-disable-next-line no-nested-ternary */
  return value <= min ? min : value >= max ? max : value;
}

const baseObject = document.getElementById('base-eye');
const grid = document.getElementById('grid');
let eyes;
let eyeCenters;
const eyeDensity = 1;
let numEyesX;
let numEyesY;
const center = new THREE.Vector2();
const mousePos = new THREE.Vector2();
// const { PI } = Math;
let maxDist;
const maxEyeTravelX = 275;
const maxEyeTravelY = 100;

function handleMouseMove(event) {
  mousePos.set(event.clientX, event.clientY);
  eyes.forEach((eye, i) => {
    const vecToMouse = new THREE.Vector2().subVectors(mousePos, eyeCenters[i]);
    // const angle = vecToMouse.angle();
    const dist = mousePos.distanceTo(eyeCenters[i]);
    // const distPercent = map(dist, 0, maxDist, 0, 1);
    const clampedMouseX = clamp(vecToMouse.x, maxEyeTravelX * -1, maxEyeTravelX);
    const clampedMouseY = clamp(vecToMouse.y, maxEyeTravelY * -1, maxEyeTravelY);
    const pupilX = map(clampedMouseX, 0, maxEyeTravelX, 0, maxEyeTravelX);
    const pupilY = map(clampedMouseY, 0, maxEyeTravelY, 0, maxEyeTravelY);
    const scale = map(dist, 0, maxDist, 0.3, 0.85);

    eye.style.setProperty('--pupil-x', pupilX);
    eye.style.setProperty('--pupil-y', pupilY);
    eye.style.setProperty('--scale', scale);
  });
}

function generateArrowGrid() {
  eyes = [];
  eyeCenters = [];
  for (let i = 0; i < numEyesX * numEyesY; i += 1) {
    // add the eye to the grid
    const newArrow = baseObject.cloneNode(true);
    newArrow.id = `eye-${i}`;
    newArrow.setAttribute('class', 'eye');
    grid.appendChild(newArrow);
    eyes.push(newArrow);

    // save its center point for use later
    const eyeRect = newArrow.getBoundingClientRect();
    const eyeCenter = new THREE.Vector2(
      eyeRect.left + (newArrow.clientWidth * 0.5),
      eyeRect.top + (newArrow.clientHeight * 0.5),
    );
    eyeCenters.push(eyeCenter);
  }
}

function handleResize() {
  // recreate the grid and elements
  const largeSide = Math.max(window.innerWidth, window.innerHeight);
  const size = Math.round(largeSide / eyeDensity);
  numEyesX = Math.ceil(window.innerWidth / size);
  numEyesY = Math.ceil(window.innerHeight / size);
  grid.style.setProperty('--num-columns', numEyesX);
  grid.style.setProperty('--num-rows', numEyesY);
  grid.innerHTML = '';
  generateArrowGrid();

  center.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
  maxDist = center.length() * 2;

  // send a fake mouse event to trigger the initial point
  handleMouseMove({ clientX: center.x, clientY: center.y });
}

function init() {
  window.addEventListener('resize', throttled(handleResize));
  window.addEventListener('mousemove', throttled(handleMouseMove));
  handleResize();
  console.log('init');
}

init();
