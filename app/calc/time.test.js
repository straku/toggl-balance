/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment'

import getHours from './time'

const FORMAT = 'DD-MM-YYYY'

test('should return correct number of work days (base example, start - Monday, end - Sunday)', () => {
  const start = moment('08-08-2016', FORMAT) // monday
  const end = moment('14-08-2016', FORMAT) // sunday
  const pattern = [8, 8, 8, 8, 8, 0, 0]
  expect(getHours(start, end, pattern)).toEqual(40)
})

test('should return correct number of work days (start and end in the middle of week)', () => {
  const start = moment('04-08-2016', FORMAT) // thursday
  const end = moment('17-08-2016', FORMAT) // wednesday
  const pattern = [8, 8, 8, 8, 8, 0, 0]
  expect(getHours(start, end, pattern)).toEqual(80)
})

test('should return correct number of work days (end on the weekend)', () => {
  const start = moment('04-08-2016', FORMAT) // thursday
  const end = moment('13-08-2016', FORMAT) // saturday
  const pattern = [8, 8, 8, 8, 8, 0, 0]
  expect(getHours(start, end, pattern)).toEqual(56)
})
