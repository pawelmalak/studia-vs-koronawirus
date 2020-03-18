import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { determinePriority } from './modules/determinePriority';
import { getClasses, getEvents } from './modules/getData';
import { emitNotification } from './modules/notifications';

dayjs.locale('pl');
dayjs.extend(relativeTime);

(async () => {
  const classesArray = await getClasses();

  classesArray.forEach(async (classInstance, index) => {
    document.querySelector('#columns-holder').innerHTML += `
    <div class="col-12 col-sm-6 col-xl-3">
      <div class="card mt-2 mb-2 my-xl-0">
        <div class="card-body" id="card-${index}">
          <h5 class="card-title">${classInstance.class_name}</h5>
        </div>
      </div>
    </div>
    `;

    const eventsArray = await getEvents(classInstance.class_id);
    
    eventsArray.forEach((eventInstance) => {
      document.querySelector(`#card-${index}`).innerHTML += `
        <div class="col-12 px-0">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">${eventInstance.event_name} <span class="badge badge-${determinePriority(eventInstance.event_deadline)} float-right">${dayjs().to(dayjs(eventInstance.event_deadline, 'YYYY-MM-DD HH:mm:ss'))}</span></h5>
              <h6 class="card-subtitle mb-2 text-muted">${dayjs(eventInstance.event_deadline).format('DD/MM/YYYY HH:mm')}</h6>
              <p class="card-text">${eventInstance.event_description}</p>
            </div>
          </div>
        </div>
      `;
    });

  });

})();