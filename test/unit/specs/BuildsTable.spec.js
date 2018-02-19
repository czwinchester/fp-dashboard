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
        headings: stubHeadings
      }
    })

    expect(wrapper.vm.headings).toEqual(stubHeadings)
  })
})
