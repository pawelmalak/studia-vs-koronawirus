import { initTheme } from './modules/themes';
import { populatePage } from './modules/populatePage';
import { hideEvent, listenForEvents } from './modules/hideEvent';
import { tracker } from './modules/tracker';

(async () => {
  populatePage();
  // initTheme();
  await tracker();
})();