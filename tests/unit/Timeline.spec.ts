import Timeline from "../../src/components/Timeline.vue"
import { today, thisWeek, thisMonth } from '../../src/mocks'
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('Timeline', () => {
  it('renders today post default', async () => {
    const wrapper = mount(Timeline)
    console.log(wrapper.html())
    // nextTick -> Vue internal promises
    // axios -> flushPromises
    await nextTick() // wait for the next frame
    await wrapper.get('[data-test="Today"]').trigger('click')
    expect(wrapper.html()).toContain(today.created.format('Do MMM YYYY'))
  })

  it('Click This Week', async () => {
    const wrapper = mount(Timeline)
    await flushPromises()

    await wrapper.get('[data-test="This Week"]').trigger('click') // click event

    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM YYYY'))
  })

  it('Click This Month', async () => {
    const wrapper = mount(Timeline)
    await flushPromises()

    await wrapper.get('[data-test="This Month"]').trigger('click') // click event

    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM YYYY'))
  })

})
