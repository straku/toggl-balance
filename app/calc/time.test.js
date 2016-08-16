import moment from 'moment'
import { expect } from 'test/expect'

import { getHours } from './time'

const FORMAT = 'DD-MM-YYYY'

describe('getBalance()', () => {
  it('should return correct number of work days (base example, start - Monday, end - Sunday)', () => {
    const start = moment('08-08-2016', FORMAT)
    const end = moment('14-08-2016', FORMAT)
    const perWeek = 5
    const hoursPerDay = 8
    expect(getHours(start, end, perWeek, hoursPerDay)).to.equal(40)
  })

  it('should return correct number of work days (start and end in the middle of week)', () => {
    const start = moment('04-08-2016', FORMAT)
    const end = moment('17-08-2016', FORMAT)
    const perWeek = 5
    const hoursPerDay = 8
    expect(getHours(start, end, perWeek, hoursPerDay)).to.equal(80)
  })

  it('should return correct number of work days (end on the weekend)', () => {
    const start = moment('04-08-2016', FORMAT)
    const end = moment('13-08-2016', FORMAT)
    const perWeek = 5
    const hoursPerDay = 8
    expect(getHours(start, end, perWeek, hoursPerDay)).to.equal(56)
  })
})
