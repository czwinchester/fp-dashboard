import BuildsTableRow from '@/components/BuildsTableRow'
import { shallow } from '@vue/test-utils'
import moment from 'moment'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

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

  describe('release time', () => {

    describe('delayed', () => {

      test('show only minutes delayed if delayed less than 1 hr', () => {
        const delayed = {
          app: 'Lincoln Way',
          name: 'bananas',
          os: 'ubanto',
          status: 'Delayed',
          release_time: moment().startOf('day').add(9, 'hours').add(1, 'minutes')
        }

        const wrapper = shallow(BuildsTableRow, {
          propsData: {
            build: delayed
          }
        })

        expect(wrapper.find('.release-time').element.innerHTML).toEqual('1m late')
      })


      test('show number of hours and mins delayed if delayed more than 1hr', () => {

        const delayed1 = {
          app: 'FordPass',
          name: 'apples',
          os: 'gentoo',
          status: 'Delayed',
          release_time: moment().startOf('day').add(13, 'hours').add(42, 'minutes')
        }

        const wrapper1 = shallow(BuildsTableRow, {
          propsData: {
            build: delayed1
          }
        })

        const delayed2 = {
          app: 'ford pass',
          name: 'coconuts',
          os: 'loonix',
          status: 'Delayed',
          release_time: moment().startOf('day').add(10, 'hours').add(9 , 'minutes')
        }

        const wrapper2 = shallow(BuildsTableRow, {
          propsData: {
            build: delayed2
          }
        })

        expect(wrapper1.find('.release-time').element.innerHTML).toEqual('4h 42m late')
        expect(wrapper2.find('.release-time').element.innerHTML).toEqual('1h 9m late')

      })

    })

    describe('on time', () => {
      test('show -', () => {
        const onTime = {
          app: 'ford pass',
          name: 'durian',
          os: 'mint',
          status: 'On time',
          release_time: moment().startOf('day').add(8, 'hours').add(59, 'minutes')
        }
        const wrapper = shallow(BuildsTableRow, {
          propsData: {
            build: onTime
          }
        })

       expect(wrapper.find('.release-time').element.innerHTML).toEqual('-')
      })
    })

    describe('no build', () => {
      test('show days if release time < 30 days ago', () => {
        const noBuild = {
          app: 'linc way',
          name: 'eggfruit',
          os: 'ganoo loonix',
          status: 'No build',
          release_time: moment().startOf('day').subtract(29, 'days')
        }

        const messages = {
            en: {
              day : 'day | days'
            }
          }

        const i18n = new VueI18n({locale: 'en', messages});

        const wrapper = shallow(BuildsTableRow, {
          i18n,
          propsData: {
            build: noBuild
          }
        })

        expect(wrapper.find('.release-time').element.innerHTML).toEqual('29 days ago')
      })
    })

  })

})
