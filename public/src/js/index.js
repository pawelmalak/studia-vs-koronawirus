import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const getData = async () => {

  const req = await fetch('/classes');
  const res = await req.json();
  return res;

}

dayjs.locale('pl');
dayjs.extend(relativeTime);

(async () => {
  const data = await getData();
  console.log(data);

  data.forEach((classInstance, index) => {
    document.querySelector('#columns-holder').innerHTML += `
    <div class="col-3">
      <div class="card">
        <div class="card-body" id="card-${index}">
          <h5 class="card-title">${classInstance.class_name}</h5>
        </div>
      </div>
    </div>
    `;
    
    classInstance.class_events.forEach((eventInstance) => {
      document.querySelector(`#card-${index}`).innerHTML += `
        <div class="col-12 px-0">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Event <span class="badge badge-${determinePriority(eventInstance.event_deadline)} float-right">${dayjs().to(dayjs(eventInstance.event_deadline, 'YYYY-MM-DD HH:mm:ss'))}</span></h5>
              <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, aliquid.</p>
            </div>
          </div>
        </div>
      `;
    });

  });

})();


const determinePriority = (eventDate) => {
  const diff = dayjs(eventDate, 'YYYY-MM-DD HH:mm:ss').diff(dayjs(), 'day');
  
  if (diff > 15) return 'success';
  else if (diff >= 7) return 'info';
  else if (diff >= 3) return 'warning';
  else if (diff >= 0) return 'danger';
  
}