import moment from 'moment-timezone'

export const formatDate = (date) => {
  return moment(date).utc().tz('Asia/Kolkata').format('MMM DD, YYYY')
}
export const formatTime = (time) => {
  return moment(time).utc().tz('Asia/Kolkata').format('HH :mm')
}

export const formatDateAgo = (date) => {
  return moment(date).utc().tz('Asia/Kolkata').fromNow()
}
