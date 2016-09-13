/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment'

import getHours from './time'

const FORMAT = 'DD-MM-YYYY'

test('should return correct number of work days (base example, start - Monday, end - Sunday)', () => {
  const start = moment('08-08-2016', FORMAT)
  const end = moment('14-08-2016', FORMAT)
  const perWeek = 5
  const hoursPerDay = 8
  expect(getHours(start, end, perWeek, hoursPerDay)).toEqual(40)
})

test('should return correct number of work days (start and end in the middle of week)', () => {
  const start = moment('04-08-2016', FORMAT)
  const end = moment('17-08-2016', FORMAT)
  const perWeek = 5
  const hoursPerDay = 8
  expect(getHours(start, end, perWeek, hoursPerDay)).toEqual(80)
})

test('should return correct number of work days (end on the weekend)', () => {
  const start = moment('04-08-2016', FORMAT)
  const end = moment('13-08-2016', FORMAT)
  const perWeek = 5
  const hoursPerDay = 8
  expect(getHours(start, end, perWeek, hoursPerDay)).toEqual(56)
})
