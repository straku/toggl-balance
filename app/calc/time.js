import moment from 'moment'

// ensures that duration will include `start` and `end` date, for date range [ 01-08-2000, 07-08-2000 ] :
// - without normalization: 6 days
// - with normalization: 7 days
// - without end.add(1, 'day'): 7 days - 1 ms
function getDurationInDays (start, end) {
  const startNormalized = start.startOf('day')
  const endNormalized = end.add(1, 'day').startOf('day')
  return moment.duration(endNormalized.diff(startNormalized)).asDays()
}

// default in moment - start of week: Sunday, change to Monday
function normalizeWeekDay (day) {
  return (day - 1 < 0) ? 6 : day - 1
}

function getNumberOfWorkDays (perWeek, start, end) {
  const firstDayOfWeek = normalizeWeekDay(start.day())
  const lastDayOfWeek = normalizeWeekDay(end.day())

  const duration = getDurationInDays(start, end)

  // calculate how many days should be subtracted from total duration to leave only full weeks
  // checks if first day of week is Monday and last day of week is Sunday, otherwise calculates what to subtract
  const stripBefore = firstDayOfWeek !== 0 ? 7 - firstDayOfWeek : 0
  const stripAfter = lastDayOfWeek !== 6 ? lastDayOfWeek + 1 : 0

  // calculate number of full weeks
  const numberOfFullWeeks = (duration - stripBefore - stripAfter) / 7

  // calculate how many of subtracted days were workdays, simplified for now:
  // it is assuming that free days are at the end of the week, so when someone works for 5 days per week free days will
  // be Saturday and Sunday (correct for most cases IMHO), maybe give possibility to modify which days should be free
  const freeDays = 7 - perWeek
  const remainingBefore = (stripBefore - freeDays) > 0 ? stripBefore - freeDays : 0
  const remainingAfter = stripAfter > perWeek ? perWeek : stripAfter

  // add subtracted workdays to final result
  return (perWeek * numberOfFullWeeks) + remainingBefore + remainingAfter
}

function getHours (startDate, endDate, perWeek, hoursPerDay) {
  const start = moment(startDate)
  const end = moment(endDate)
  const numberOfWorkDays = getNumberOfWorkDays(perWeek, start, end)

  return numberOfWorkDays * hoursPerDay
}

export default getHours
