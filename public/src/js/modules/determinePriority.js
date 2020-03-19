import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('pl');
dayjs.extend(relativeTime);

/**
 * @brief Takes date string as an argument, parses it and based on its value, returns CSS class name
 * @param {string} eventDate 
 * @returns {string} CSS class name
 */
export const determinePriority = (eventDate) => {
  const diff = dayjs(eventDate, 'YYYY-MM-DD HH:mm:ss').diff(dayjs(), 'day');
  
  if (diff > 15) return 'success';
  else if (diff >= 7) return 'info';
  else if (diff >= 3) return 'warning';
  else if (diff >= 0) return 'danger';
  else return 'light';
  
}