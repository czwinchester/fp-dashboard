import { shallow } from '@vue/test-utils'
import App from '@/App'
import router from '@/router'

describe('App.vue', () => {
  describe('when the builds tab is clicked', () => {
    let wrapper
    beforeAll(() => {
      wrapper = shallow(App, {router})
      wrapper.find('builds-tab').trigger('click')
    })

    test('the builds tab should be active', () => {

    })
  })

  describe('when the insights tab is clicked', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(App, {router})
      wrapper.find('#metrics-tab').trigger('click')
    })

    test('the metrics tab should be active', () => {

    })
  })
})
