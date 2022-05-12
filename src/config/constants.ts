import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const TABLES = 5;
export const TABLE_SEATS = 4;
export const ALLOW_MIX_TABLES = true;
export const SEATING_TIME = dayjs.duration({ minutes: 60 });
export const OPENING_TIME = dayjs().hour(19).minute(0).second(0).millisecond(0);
export const OPENING_DURATION = dayjs.duration({ hours: 5 });
