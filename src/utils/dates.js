import moment from 'moment';

const convertToFormattedDate = (date, format: string = 'DD/MM/YYYY') =>
  date != null ? moment(date).format(format) : null;

const parseDateToMillis = (date) =>
  date != null ? new Date(date).getTime() : null;

const convertToUTCStartOfDay = (date) =>
  date != null ? moment(date).startOf('day').utc().valueOf() : null;

const convertToUTCEndOfDay = (date) => {
  return date != null ? moment(date).endOf('day').utc().valueOf() : null;
}

const convertDateFromMillis = (date) =>
  date != null ? new Date(date).toISOString() : null;

export default {
  parseDateToMillis,
  convertToUTCStartOfDay,
  convertToUTCEndOfDay,
  convertDateFromMillis,
  convertToFormattedDate
};
