import React from 'react'
import { shallow, mount } from 'enzyme'
import jsdom from 'mocha-jsdom'
import expect from 'test/expect'

import App from './App'

describe('<App />', () => {
  jsdom()

  it('renders text "Hello world" - shallow rendering', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.have.text('Hello world')
  })

  it('renders text "Hello world" - full DOM rendering', () => {
    const wrapper = mount(<App />)
    expect(wrapper).to.have.text('Hello world')
  })
})
