(() => {

  const btn = document.querySelector('#notify');
  btn.textContent = `Powiadomienia (${(Notification.permission === 'granted') ? 'on' : 'off'})`;

  btn.addEventListener('click', () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            emitNotification();
            btn.textContent = `Powiadomienia (${(Notification.permission === 'granted') ? 'on' : 'off'})`;
          }
        });
    }
  });
  
})();

export const emitNotification = (title, desc) => {

  const notification = new Notification('Testowe powiadomienie', {
    body: 'to tylko test',
    icon: '/assets/img/approved.png'
  });

}