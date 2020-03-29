const getData = require('../getData');

const getUpcoming = async () => {
  // get 3 upcoming events
  const events = (await getData('upcoming'));
  let eventsSummary = '';
  
  events.forEach(({event_name}) => {
    eventsSummary += `${event_name}\n`;
  });

  return eventsSummary;

};

module.exports = getUpcoming;