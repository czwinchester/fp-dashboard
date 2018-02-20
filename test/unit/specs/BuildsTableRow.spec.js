import BuildsTableRow from '@/components/BuildsTableRow'
import { shallow } from '@vue/test-utils'

describe('BuildsTableRow.vue', () => {
  test('should receive a build as a prop', () => {
    const stubBuild = {
      app: 'FordPass',
      os: 'Android',
      name: 'FordPass CN v2.0 Stage',
      region: 'CN',
      status: 'no_build',
      release_time: '2018-03-03T17:18:19.000Z'
    }
    const wrapper = shallow(BuildsTableRow, {
      propsData: {
        build: stubBuild
      }
    })
    expect(wrapper.vm.build).toBe(stubBuild)
  })
  describe('os icon', () => {
    test('should display android icon when passed android build', () => {
      const androidBuild = {
        app: 'FordPass',
        os: 'Android',
        name: 'FordPass CN v2.0 Stage',
        region: 'CN',
        status: 'no_build',
        release_time: '2018-03-21T17:18:19.000Z'
      }
      const wrapper = shallow(BuildsTableRow, {
        propsData: {
          build: androidBuild
        }
      })
      const expectedClasses = ['fa', 'fa-android']
      expect(wrapper.find('i').classes()).toEqual(expectedClasses)
    })

    test('should display iOS icon when passed iOS build', () => {
      const iOSBuild = {
        app: 'FordPass',
        os: 'iOS',
        name: 'FordPass CN v2.0 Stage',
        region: 'CN',
        status: 'no_build',
        release_time: '2018-03-21T17:18:19.000Z'
      }
      const wrapper = shallow(BuildsTableRow, {
        propsData: {
          build: iOSBuild
        }
      })
      const expectedClasses = ['fa', 'fa-apple']
      expect(wrapper.find('i').classes()).toEqual(expectedClasses)
    })
  })
})
