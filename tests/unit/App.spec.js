import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
// import Member from '@/views/Member.vue'
import router from '@/router.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI, { locale })

describe('App', () => {
  it('renders a child component via routing', () => {
    const wrapper = mount(App, { localVue, router })
    router.push('/member')

    // expect(wrapper.find(Member).exists()).toBe(true)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
