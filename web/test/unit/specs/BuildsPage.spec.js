import BuildsPage from '@/components/BuildsPage.vue'
import router from '@/router'
import mockAxios from 'jest-mock-axios'
import { shallow, mount } from '@vue/test-utils'

describe('BuildsPage.vue', () => {

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  })


  describe('when the BuildsPage is mounted', () => {
    const stubBuilds = [
      {
        'id': 99,
        'name': 'FordPass SA (Stage)',
        'platform': 'android',
        'version': '1.0.0',
        'release_time': '2017-08-10T00:13:52.000Z',
        'latest': 1,
        'region': 'SA',
        'type': 'standard'
      },
      {
        'id': 103,
        'name': 'FordPass SA (Stage)',
        'platform': 'ios',
        'version': '1.0',
        'release_time': '2017-08-16T14:58:20.000Z',
        'latest': 1,
        'region': 'SA',
        'type': 'standard'
      }
    ]

    test('should call the getLatestBuilds method once', () => {
      const getLatestBuilds = jest.fn()
      shallow(BuildsPage, {
        methods: {
          getLatestBuilds
        }
      },
      router)
      expect(getLatestBuilds).toHaveBeenCalledTimes(1)
    })

    test('should make a GET request to the latestBuilds service', () => {
      shallow(BuildsPage)
      mockAxios.mockResponse({data: stubBuilds})
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    test('should set the latestBuilds prop with response data from the service', (done) => {
      const wrapper = shallow(BuildsPage)
      expect(wrapper.vm.builds).toEqual([])
      mockAxios.mockResponse({data: stubBuilds})
      wrapper.vm.$nextTick(() => {
        wrapper.vm.$nextTick(() => {
          wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.builds).toEqual(stubBuilds)
            done()
          })
        })
      })
    })
  })

  describe('search bar', () => {
    test('search build name', () => {
      const cn1 = {"uid":11,"name":"FordPass CN 2.0","os":"Android","shortversion":"2.0.0","longversion":"2.0.0","release_time":"2018-02-13T12:12:45.000Z","status":"No build","latest":1,"created_at":"2018-02-19T22:54:34.000Z","updated_at":"2018-02-19T22:54:34.000Z"}

      const cn2 = {"uid":13,"name":"FordPass CN 2.0","os":"iOS","shortversion":"2.0","longversion":"2.0","release_time":"2018-02-14T11:38:08.000Z","status":"No build","latest":1,"created_at":"2018-02-19T22:54:34.000Z","updated_at":"2018-02-19T22:54:34.000Z"}

      const na = {"uid":17,"name":"FordPass NA 2.0","os":"iOS","shortversion":"2.0","longversion":"2.0","release_time":"2018-02-14T11:24:48.000Z","status":"No build","latest":1,"created_at":"2018-02-19T22:54:34.000Z","updated_at":"2018-02-19T22:54:34.000Z"}

      const stubBuilds = [cn1, cn2, na]

      const wrapper = shallow(BuildsPage, {
        data: {
          search: 'CN',
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.searchedBuilds.length).toEqual(2)
    })

    test('search os', () => {
      const android = { name: 'apples', os: 'Android'}
      const iOS = { name: 'bananas', os: 'iOS'}

      const stubBuilds = [
        android,
        android,
        android,
        iOS,
        iOS
      ]

      const wrapper = shallow(BuildsPage, {
        data: {
          search: 'droid',
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.searchedBuilds.length).toEqual(3)
    })

    test('search name and os', () => {
      const androidApples = { name: 'apples', os: 'Android' }
      const androidBananas = { name: 'bananas', os: 'Android' }
      const iOSBananas = { name: 'bananas', os: 'iOS' }

      const stubBuilds = [
        androidApples,
        androidApples,
        androidBananas,
        iOSBananas,
        iOSBananas
      ]

      const wrapper = shallow(BuildsPage, {
        data: {
          search: 'bananas droid',
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.searchedBuilds.length).toEqual(1)
    })

    test('search status', () => {
      const onTime = { name: 'apples', status: 'On time' }
      const noBuild = { name: 'bananas', status: 'No build' }
      const delayed = { name: 'coconuts', status: 'Delayed' }

      const stubBuilds = [
        onTime,
        noBuild,
        noBuild
      ]

      const wrapper = shallow(BuildsPage, {
        data: {
          search: 'no build',
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.searchedBuilds.length).toEqual(2)
    })

    test('search name, os and status', () => {
      const androidDelayedCN = { name: 'apples cn', status: 'Delayed', os: 'Android' }
      const iOSDelayedNA = { name: 'bananas na', status: 'Delayed', os: 'iOS' }
      const iOSDelayedCN = { name: 'apples cn', status: 'Delayed', os: 'iOS' }
      const androidOnTimeCN = { name: 'coconuts cn', status: 'On time', os: 'Android' }

      const stubBuilds = [
        androidDelayedCN,
        iOSDelayedNA,
        iOSDelayedCN,
        androidOnTimeCN
      ]

      const wrapper = shallow(BuildsPage, {
        data: {
          search: 'on time android cn',
          builds: stubBuilds
        }
      })

      expect(wrapper.vm.searchedBuilds[0]).toEqual(androidOnTimeCN)
    })
  })

})
