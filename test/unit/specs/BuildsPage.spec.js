import BuildsPage from '@/components/BuildsPage.vue'
import router from '@/router'
import mockAxios from 'jest-mock-axios/dist/index'
import {shallow} from '@vue/test-utils'

describe('BuildsPage.vue', () => {
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
      expect(wrapper.vm.latestBuilds).toBe(undefined)
      mockAxios.mockResponse({data: stubBuilds})
      wrapper.vm.$nextTick(() => {
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.builds).toBe(stubBuilds)
        })
        done()
      })
    })
  })
})
