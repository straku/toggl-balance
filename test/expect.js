/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(dirtyChai)
chai.use(chaiEnzyme())

const { expect } = chai

export default expect
