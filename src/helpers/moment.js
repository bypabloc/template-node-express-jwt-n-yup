import moment from 'moment'

export const tzNames = moment.tz.names();

export const convertDateToTimeZone = ({ date, tz }) => {
    return moment(date).tz(validateTimeZone({ tz }));
}

export const validateTimeZone = ({ tz }) => {
    return moment.tz.names().includes( tz ) 
        ? tz : moment.tz.guess();
}

export const momentNow = (args = {}) => {
    const { tz } = args;
    return moment().tz(validateTimeZone({ tz }));
}