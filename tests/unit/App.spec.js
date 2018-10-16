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
  it('renders component is a  vue instance', () => {
    const wrapper = mount(App, { localVue, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
