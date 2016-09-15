import _ from 'lodash'
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

function getNumberOfFullWeeks (start, end) {
  const firstDayOfWeek = normalizeWeekDay(start.day())
  const lastDayOfWeek = normalizeWeekDay(end.day())
  const duration = getDurationInDays(start, end)

  // calculate how many days should be subtracted from total duration to leave only full weeks
  // checks if first day of week is Monday and last day of week is Sunday, otherwise calculates what to subtract
  const stripBefore = firstDayOfWeek !== 0 ? 7 - firstDayOfWeek : 0
  const stripAfter = lastDayOfWeek !== 6 ? lastDayOfWeek + 1 : 0

  // calculate number of full weeks
  const numberOfFullWeeks = (duration - stripBefore - stripAfter) / 7

  return {
    weeks: numberOfFullWeeks,
    daysBefore: stripBefore,
    daysAfter: stripAfter,
  }
}

function calculateHours (pattern, week = [1, 1, 1, 1, 1, 1, 1]) {
  return pattern.reduce((totalTime, timePerDay, i) => totalTime + (timePerDay * week[i]), 0)
}

function getCompare (leftPad) {
  if (leftPad) return (a, b) => (a >= (7 - b))
  return (a, b) => (a < b)
}

// when `leftPad` set to true it means that we are considering last days of week, for example
// numberOfDays = 4 and leftPad = true generates [0, 0, 0, 1, 1, 1, 1]
// numberOfDays = 4 and leftPad = false generates [1, 1, 1, 1, 0, 0, 0]
function getWeekPattern (numberOfDays, leftPad = false) {
  if (numberOfDays === 0) return new Array(7).fill(0)
  const compare = getCompare(leftPad)
  return _.range(7).map(day => {
    if (compare(day, numberOfDays)) return 1
    return 0
  })
}

function getHours (startDate, endDate, pattern) {
  const start = moment(startDate)
  const end = moment(endDate)
  const { weeks, daysBefore, daysAfter } = getNumberOfFullWeeks(start, end)
  const hours = (
    (calculateHours(pattern) * weeks) + // full weeks
    calculateHours(pattern, getWeekPattern(daysBefore, true)) + // days before full weeks
    calculateHours(pattern, getWeekPattern(daysAfter)) // days after full weeks
  )
  return hours
}

// helper function for calculating week work pattern
function getPattern (perWeek, perDay) {
  return _.range(7).map(i => {
    if (i < perWeek) return perDay
    return 0
  })
}

export { getHours, getPattern }
