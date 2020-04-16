import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { determinePriority } from './determinePriority';
import { getClasses, getEvents } from './getData';
import md5 from 'md5';
import { hideEvent, listenForEvents } from './hideEvent';
import { initSlider } from './slider';

dayjs.locale('pl');
dayjs.extend(relativeTime);

export const populatePage = async () => {

  const classesArray = await getClasses();

  classesArray.forEach(async ({ class_id, class_name }, index) => {
    document.querySelector('#columns-holder').innerHTML += `
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card mt-2 mb-2 my-xl-0">
          <div class="card-body" id="card-${index}">
            <h5 class="card-title">${class_name}</h5>
          </div>
        </div>
      </div>
    `;

    const eventsArray = await getEvents(class_id);
    
    if (eventsArray.length > 0) {
      eventsArray.forEach(({ event_id, event_name, event_description, event_deadline }) => {

        const hash = md5(`${class_id}${event_id}${event_name}`);
  
        document.querySelector(`#card-${index}`).innerHTML += `
          <div class="card mt-3 js-event-card" data-hash="${hash}">
            <div class="card-body">
              <h5 class="card-title">${event_name} <span class="badge badge-${determinePriority(event_deadline)} float-right">${dayjs().to(dayjs(event_deadline, 'YYYY-MM-DD HH:mm:ss'))}</span></h5>
              <h6 class="card-subtitle mb-2 text-muted">${dayjs(event_deadline).format('DD/MM/YYYY HH:mm')}</h6>
              <p class="card-text">${event_description}</p>
            </div>
          </div>
        `;
  
      });
    }
    else {
      document.querySelector(`#card-${index}`).innerHTML += `
        <p class="text-muted mt-5 text-center">
          Wszystkie zadania zostały oznaczone jako ukończone lub nie ma nadchodzących terminów
        </p>
      `;
    }
  });

  initSlider(classesArray.length);
  setTimeout(listenForEvents, 1000);

}