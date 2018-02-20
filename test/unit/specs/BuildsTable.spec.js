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
        'id': 99,
        'name': 'FordPass SA (Stage)',
        'os': 'android',
        'release_time': '2017-08-10T00:13:52.000Z',
        'status' : 'No build',
        'latest': 1,
        'region': 'SA',
      }
      const onTime1 = {
        'id': 99,
        'name': 'FordPass SA (Stage)',
        'os': 'android',
        'release_time': '2017-08-10T00:13:52.000Z',
        'status' : 'On time',
        'latest': 1,
        'region': 'SA',
      }
      const onTime2 = {
        'id': 99,
        'name': 'FordPass SA (Stage)',
        'os': 'android',
        'release_time': '2017-08-10T00:13:52.000Z',
        'status' : 'On time',
        'latest': 1,
        'region': 'SA',
      }

      const stubBuilds = [onTime1, onTime2, noBuild]

      const wrapper = shallow(BuildsTable, {
        propsData: {
          headings: [],
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.builds[0]).toEqual(noBuild)
    })
  })
})
