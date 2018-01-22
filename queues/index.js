const ScrapeQ = require('./scrape_q');

function scheduleDay(dayOfWeek) {
  const date = new Date();
  const dayDifference = dayOfWeek - date.getDay();
  const difference = (7 + dayDifference) % 7;
  return date.setDate(date.getDate() + difference);
}


module.exports = {
  scheduleDay,
  ScrapeQ,
};
