const changeTheme = (lightTheme) => {
  const btn = document.querySelector('#theme');
  const link = document.querySelector('#style-link');

  if (lightTheme == true) {
    btn.textContent = `Motyw (light)`;
    link.setAttribute('href', '/css/lightBootstrap.min.css');
  }
  else {
    btn.textContent = `Motyw (dark)`;
    link.setAttribute('href', '/css/darkBootstrap.min.css');
  }

  localStorage.setItem('customTheme', 'true');

};

/**
 * @brief Checks which theme is currently active
 * @param - 
 * @returns {boolean} true if light theme is active, false if dark theme is active
 */
const checkThemeLive = () => {
  return ((/light/).test(document.querySelector('#theme').textContent)) ? true : false;
}

/**
 * @brief Checks which theme is saved in the local storage
 * @param - 
 * @returns {boolean} true if light theme is saved, false if dark theme is saved
 */
const checkThemeLocal = () => {
  if (localStorage.getItem('lightTheme')) return (localStorage.getItem('lightTheme') == 'true') ? true : false;
}

export const initTheme = () => {

  const btn = document.querySelector('#theme');

  if (localStorage.getItem('customTheme') == 'true') {
    if (checkThemeLocal() != checkThemeLive()) changeTheme(checkThemeLocal());
  }

  btn.addEventListener('click', () => {
    if (checkThemeLive()) localStorage.setItem('lightTheme', 'false');
    else localStorage.setItem('lightTheme', 'true')
    changeTheme(checkThemeLocal());
  });

}