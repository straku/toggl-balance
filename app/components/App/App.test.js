import React from 'react'
import { shallow } from 'enzyme'
import jsdom from 'mocha-jsdom'
import expect from 'test/expect'

import App from './App'

describe('<App />', () => {
  jsdom()

  it('renders without exploding', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.have.length(1)
  })
})
