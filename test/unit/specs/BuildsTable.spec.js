import BuildsTable from '@/components/BuildsTable'
import { shallow } from '@vue/test-utils'

describe('BuildsTable.vue', () => {
  test('should receive correct heading props as data', () => {
    const stubHeadings = [
      'apples',
      'bananas',
      'oranges'
    ]

    const wrapper = shallow(BuildsTable, {
      propsData: {
        builds: [],
        headings: stubHeadings
      }
    })
    expect(wrapper.vm.headings).toEqual(stubHeadings)
  })

  describe('order by status', () => {
    test('No build should come before On time', () => {
      const noBuild = {
        'status' : 'No build'
      }
      const onTime1 = {
        'status' : 'On time'
      }
      const onTime2 = {
        'status' : 'On time'
      }

      const stubBuilds = [onTime1, onTime2, noBuild]

      const wrapper = shallow(BuildsTable, {
        propsData: {
          headings: [],
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.builds[0].status).toEqual('No build')
      expect(wrapper.vm.builds[1].status).toEqual('On time')
      expect(wrapper.vm.builds[2].status).toEqual('On time')
    })
  })
})
