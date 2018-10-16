import { createLocalVue, shallowMount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'
import InfoBoard from '@/components/member/InfoBoard'

const localVue = createLocalVue()
localVue.use(ElementUI, { locale })

describe('InfoBoard', () => {
  it('renders infoBoard with correct text', () => {
    const wrapper = shallowMount(InfoBoard, {
      localVue,
      propsData: {
        info: {
          ApiMsg: null,
          Ename: '林明穎',
          IsApiError: false,
          IsC1_Score: false,
          IsC1_Status: true,
          IsC2_Status: false,
          IsC25: false,
          IsC112: true,
          IsC134: true,
          IsC212: false,
          IsC212_Score: true,
          IsC234: true,
          IsC234_Score: false,
          Iswitness: true,
          TxtC1_Score: '0分',
          TxtC1_Status: 'C1 判定通過',
          TxtC2_Status: 'C2 判定不通過',
          TxtC112: '已上課',
          TxtC134: '已上課',
          TxtC212_Score: '80分',
          TxtC234_Score: '0分',
          TxtIsC25: '查無上課紀錄',
          TxtIsC212: '查無上課紀錄',
          TxtIsC234: '已上課',
          Txtwitness: '已交',
          gcroup: '社青',
          group: 'CA202.信豪牧區-彥伯小組'
        }
      }
    })

    expect(wrapper.text().indexOf('林明穎')).not.toBe(-1)
    expect(wrapper.contains('.color-success')).toBe(true)
  })
})
