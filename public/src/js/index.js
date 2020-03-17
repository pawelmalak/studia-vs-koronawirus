import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const container = document.querySelector('.container');

const getData = async () => {

  const req = await fetch('/classes');
  const res = await req.json();
  return res;

}

dayjs.locale('pl');
dayjs.extend(relativeTime);

console.log(dayjs('2018-05-05').format());
console.log(dayjs().to(dayjs('2020-03-17 21:30:00', 'YYYY-MM-DD HH:mm:ss')));

(async () => {
  console.log(await getData());
})();

