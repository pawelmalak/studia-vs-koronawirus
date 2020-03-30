import { tns } from 'tiny-slider/src/tiny-slider';

export const initSlider = (items) => {

  const slider = tns({
    container: '.slider',
    items,
    slideBy: 'page',
    // autoWidth: true,
    controls: false,
    nav: false,
    arrowKeys: true,
    mouseDrag: true,
    loop: false,
    gutter: 10,
    fixedWidth: 445
  });

}