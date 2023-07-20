const { format, formatDistance } = require('date-fns');
const { uk } = require('date-fns/locale');

const dateConverter = timestamp => {
  //   const date = new Date(timestamp.toDate());
  const date = new Date(timestamp * 1000);

  const timeBetween = formatDistance(new Date(1689711295 * 1000), date)
  console.log('timeBetween', timeBetween);
  return format(Date.parse(date), 'dd MMMM, yyyy | HH:mm', {
    locale: uk,
  });
};

module.exports = {
  dateConverter,
};


// import { formatDistance, subDays } from 'date-fns'

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
// //=> "3 days ago"

// https://date-fns.org/v2.30.0/docs/formatDistance