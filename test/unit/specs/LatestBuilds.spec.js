import { mount, shallow } from '@vue/test-utils'
import LatestBuilds from '@/components/LatestBuilds'
import router from '@/router'
import mockAxios from 'jest-mock-axios'
import moment from 'moment'
import MockDate from 'mockdate'

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset()
})

describe('LatestBuilds.vue', () => {
  // let catchFn = jest.fn(),
  //   thenFn = jest.fn()

  describe('when the Latest Builds component is mounted', () => {
    const stubBuilds = [
      {'id': 99,
        'name': 'FordPass SA (Stage)',
        'platform': 'android',
        'version': '1.0.0',
        'release_time': '2017-08-10T00:13:52.000Z',
        'latest': 1,
        'region': 'SA',
        'type': 'standard'},
      {'id': 103,
        'name': 'FordPass SA (Stage)',
        'platform': 'ios',
        'version': '1.0',
        'release_time': '2017-08-16T14:58:20.000Z',
        'latest': 1,
        'region': 'SA',
        'type': 'standard'}
    ]

    it('should call the getLatestBuilds method once', () => {
      const getLatestBuilds = jest.fn()
      shallow(LatestBuilds, {
          methods: {
            getLatestBuilds
          }
        },
        router)
      expect(getLatestBuilds).toHaveBeenCalledTimes(1)
    })

    it('should make a GET request to the latestBuilds service', () => {
      shallow(LatestBuilds)
      mockAxios.mockResponse({ data: stubBuilds })
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should set the latestBuilds prop with response data from the service', (done) => {
      const wrapper = shallow(LatestBuilds)
      mockAxios.mockResponse({ data: stubBuilds })
      wrapper.vm.$nextTick(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.latestBuilds).toBe(stubBuilds)
        })
        done()
      })
    })
  })

  describe('component layout', () => {
    const wrapper = shallow(LatestBuilds)

    it('should contain a section for the latestBuild content', () => {
      expect(wrapper.contains('section')).toBe(true)
    })

    it('should contain a container within the section', () => {
      expect(wrapper.contains('section > .container')).toBe(true)
    })

    it('should have header text: Latest Builds', () => {
      expect(wrapper.find('h1').text()).toBe('Latest Builds')
    })

    it('should display todays date', () => {
      expect(wrapper.find('h2').text()).toBe(moment().format('ddd Do MMM'))
    })

    it('should display a table with the latest builds', () => {
      expect(wrapper.contains('table.table#latest-builds-table')).toBe(true)
    })
  })

  describe('latest builds table', () => {
    const androidBuild = {
      'id': 99,
      'name': 'FordPass SA (Stage)',
      'status': 'ok'
    }

    const iOSBuild = {
      'id': 103,
      'name': 'Lincoln Way CN FB3 (Staging)',
      'status': 'no_build'
    }

    const iOSBuild2 = {
      'id': 103,
      'name': 'Lincoln Way CN FB3 (Staging)',
      'status': 'delayed'
    }

    const stubBuilds = [androidBuild, iOSBuild, iOSBuild2]

    const wrapper = shallow(LatestBuilds)

    wrapper.setData({ latestBuilds: stubBuilds })

    it('should render the correct number of rows in the table', () => {
      expect(wrapper.findAll('.build').length).toBe(stubBuilds.length)
    })

    it('should display the correct app icon for the row', () => {
      expect(wrapper.findAll('img').at(0).attributes().src).toBe('../assets/fp-icon.png')
      expect(wrapper.findAll('img').at(1).attributes().src).toBe('../assets/lw-icon.png')
      expect(wrapper.findAll('img').at(2).attributes().src).toBe('../assets/lw-icon.png')
    })

    it('should display the correct status for the row', () => {
      expect(wrapper.findAll('.status').at(0).text()).toEqual(androidBuild.status)
      expect(wrapper.findAll('.status').at(1).text()).toEqual(iOSBuild.status)
      expect(wrapper.findAll('.status').at(2).text()).toEqual(iOSBuild2.status)
    })
  })
})
