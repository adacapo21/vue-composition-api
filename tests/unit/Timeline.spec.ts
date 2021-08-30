import Timeline from '../../src/components/Timeline.vue'
import { today, thisWeek, thisMonth } from '@/mocks'
import { mount, flushPromises } from '@vue/test-utils'
import { Store } from '../../src/store'

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline () {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false
    },
    authors: {
      ids: [],
      all: new Map(),
      loaded: false,
      currentUserId: undefined
    }
  })
  const testComponent = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          Loading in progress...
        </template>
      </suspense>
    `
  }
  return mount(testComponent, {
    global: {
      plugins: [store]
    }
  })
}

describe('Timeline', () => {
  it('renders today post default', async () => {
    const wrapper = mountTimeline()
    console.log(wrapper.html())
    // nextTick -> Vue internal promises
    // axios -> flushPromises
    await flushPromises() // wait for the next frame
    await wrapper.get('[data-test="Today"]').trigger('click')
    expect(wrapper.html()).toContain(today.created.format('Do MMM YYYY'))
  })

  it('Click This Week', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-test="This Week"]').trigger('click') // click event

    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM YYYY'))
  })

  it('Click This Month', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-test="This Month"]').trigger('click') // click event

    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM YYYY'))
  })
})
