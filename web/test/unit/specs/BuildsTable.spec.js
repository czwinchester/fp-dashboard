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
      const onTime = {
        'status' : 'On time'
      }
      const noBuild = {
        'status' : 'No build'
      }

      const stubBuilds = [onTime, noBuild, onTime, noBuild]

      const wrapper = shallow(BuildsTable, {
        propsData: {
          headings: [],
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.sortedBuilds[0].status).toEqual('No build')
      expect(wrapper.vm.sortedBuilds[1].status).toEqual('No build')
      expect(wrapper.vm.sortedBuilds[2].status).toEqual('On time')
      expect(wrapper.vm.sortedBuilds[3].status).toEqual('On time')

    })

    test('Delayed should come before On time', () => {
      const delayed = {
        'status' : 'Delayed'
      }

      const onTime = {
        'status' : 'On time'
      }


      const stubBuilds = [delayed, onTime, delayed, onTime]

      const wrapper = shallow(BuildsTable, {
        propsData: {
          headings: [],
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.sortedBuilds[0].status).toEqual('Delayed')
      expect(wrapper.vm.sortedBuilds[1].status).toEqual('Delayed')
      expect(wrapper.vm.sortedBuilds[2].status).toEqual('On time')
      expect(wrapper.vm.sortedBuilds[3].status).toEqual('On time')
    })

    test('Delayed should come after No build', () => {
      const delayed = {
        'status' : 'Delayed'
      }

      const noBuild = {
        'status' : 'No build'
      }


      const stubBuilds = [delayed, noBuild]

      const wrapper = shallow(BuildsTable, {
        propsData: {
          headings: [],
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.sortedBuilds[0]).toBe(noBuild)
      expect(wrapper.vm.sortedBuilds[1]).toBe(delayed)

    })

    test('Should display statuses in correct order', () => {
      const delayed = {
        'status': 'Delayed'
      }

      const noBuild = {
        'status': 'No build'
      }

      const onTime = {
        'status': 'On time'
      }

      const stubBuilds = [
        onTime,
        onTime,
        delayed,
        noBuild,
        delayed,
        onTime,
        noBuild,
        delayed,
        delayed,
        onTime,
        noBuild,
        delayed,
        delayed,
        delayed,
        delayed
      ]

      const wrapper = shallow(BuildsTable, {
        propsData: {
          headings: [],
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.sortedBuilds[0]).toBe(noBuild)
      expect(wrapper.vm.sortedBuilds[1]).toBe(noBuild)
      expect(wrapper.vm.sortedBuilds[2]).toBe(noBuild)
      expect(wrapper.vm.sortedBuilds[3]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[4]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[5]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[6]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[7]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[8]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[9]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[10]).toBe(delayed)
      expect(wrapper.vm.sortedBuilds[11]).toBe(onTime)
      expect(wrapper.vm.sortedBuilds[12]).toBe(onTime)
      expect(wrapper.vm.sortedBuilds[13]).toBe(onTime)
      expect(wrapper.vm.sortedBuilds[14]).toBe(onTime)

    })
  })
})
