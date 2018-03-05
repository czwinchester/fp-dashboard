import BuildsTableHeader from '@/components/BuildsTableHeader'
import { shallow } from '@vue/test-utils'

describe('BuildsTableHeader.vue', () => {
  test('header should contain the correct headings', () => {
    const stubHeadings = [
      'Phrygian',
      'Aeolian',
      'Mixolydian'
    ]

    const wrapper = shallow(BuildsTableHeader, {
      propsData: {
        headings: stubHeadings
      }
    })

    expect(wrapper.vm.headings).toEqual(stubHeadings)
  })
})
