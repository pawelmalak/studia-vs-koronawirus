import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const getClasses = async () => {

  const req = await fetch('/classes');
  const res = await req.json();
  return res;

}

const getEvents = async (classId) => {

  const req = await fetch(`/events?id=${classId}`);
  const res = await req.json();
  return res;

}



dayjs.locale('pl');
dayjs.extend(relativeTime);

(async () => {
  const classesArray = await getClasses();
  console.log(classesArray);

  classesArray.forEach(async (classInstance, index) => {
    document.querySelector('#columns-holder').innerHTML += `
    <div class="col-12 col-sm-6 col-xl-3">
      <div class="card mt-4 mt-xl-0">
        <div class="card-body" id="card-${index}">
          <h5 class="card-title">${classInstance.class_name}</h5>
        </div>
      </div>
    </div>
    `;

    const eventsArray = await getEvents(classInstance.class_id);
    console.log(eventsArray);
    
    eventsArray.forEach((eventInstance) => {
      document.querySelector(`#card-${index}`).innerHTML += `
        <div class="col-12 px-0">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">${eventInstance.event_name} <span class="badge badge-${determinePriority(eventInstance.event_deadline)} float-right">${dayjs().to(dayjs(eventInstance.event_deadline, 'YYYY-MM-DD HH:mm:ss'))}</span></h5>
              <p class="card-text">${eventInstance.event_description}</p>
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
  else return 'light';
  
}