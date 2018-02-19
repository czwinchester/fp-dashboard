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
      release_time: '23-03-18T17:18:19Z'
    }
    const wrapper = shallow(BuildsTableRow, {
      propsData: {
        build: stubBuild
      }
    })
    expect(wrapper.vm.build).toBe(stubBuild)
  })
  test('should have a table cell for each heading', () => {
    const stubBuild = {
      app: 'FordPass',
      os: 'Android',
      name: 'FordPass CN v2.0 Stage',
      region: 'CN',
      status: 'no_build',
      release_time: '23-03-18T17:18:19Z'
    }
    const wrapper = shallow(BuildsTableRow, {
      propsData: {
        build: stubBuild
      }
    })
    expect(wrapper.findAll('td').length).toEqual(6)
  })
})
