export const requestStateChange = () => {
  const btn = document.querySelector('#notify');
  let state = ((/off/).test(btn.textContent)) ? 0 : 1;

  btn.addEventListener('click', () => {
    state = !state;
    console.log(state);
  });
}