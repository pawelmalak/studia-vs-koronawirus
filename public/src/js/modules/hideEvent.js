export const hideEvent = () => {

}

export const listenForEvents = () => {

  document.querySelectorAll('.js-event-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      
      
      const pointer = e.target.className;
      let element;

      
      if (/card-body/.test(pointer)) element = e.target.parentElement;
      else if (/badge/.test(pointer)) element = e.target.parentElement.parentElement.parentElement;
      else element = e.target.parentElement.parentElement;
      
      if (e.altKey) element.className += ' hidden-demo';

    });
  });

}


/**
 * @brief 
 * @param {string} eventHash - 
 */
const storeEventHash = (eventHash) => {



}