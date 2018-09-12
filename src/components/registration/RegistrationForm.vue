<template>
  <el-col
    :span="12"
    :offset="6"
    :xs="{ span: 19, offset: 3 }"
  >
    <div v-html="subInfo.HtmlSubDesc"></div>

    <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="105px" @submit.prevent.native="checkEnter">
      <el-form-item label="組別" prop="gcroup">
        <el-select
          v-model="form.gcroup"
          @change="onGcroupChange"
        >
          <el-option v-for="group in groupData" :value="group.group" :key="group.group">{{ group.group }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="小組" prop="group">
        <el-select v-model="form.group" >
          <el-option v-for="group in groupList"  :value="group" :key="group">{{ group }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手機" prop="phone">
        <el-input v-model="form.phone" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="" prop="cacheInfo">
        <el-checkbox-group v-model="form.cacheInfo">
          <el-checkbox label="記住我的資訊" name="cacheInfo"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="checkForm('form')" :loading="sending">報名</el-button>
        <el-button size="small" @click="resetForm('form')" :disabled="sending">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import { addSubSignApi, chkMemberApi } from '../../api'

export default {
  data () {
    return {
      labelPosition: 'right',
      form: {
        gcroup: '',
        group: '',
        name: '',
        phone: '',
        email: '',
        cacheInfo: true,
        mid: '',
        dataChangeMsg: []
      },
      rules: {
        gcroup: [
          { required: true, message: '請選擇組別', trigger: 'change' }
        ],
        group: [
          { required: true, message: '請選擇小組', trigger: 'change' }
        ],
        name: [
          { required: true, message: '請輸入名字', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '請輸入手機', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const re = /^[09]{2}[0-9]{8}$/
              if (!re.test(value)) {
                callback(new Error('請輸入正確手機格式'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      sending: false
    }
  },
  props: {
    subInfo: {
      type: Object,
      required: true
    },
    groupData: {
      type: Array,
      required: true
    }
  },
  computed: {
    groupList: function () {
      const { find, get } = this.$lodash
      const group = find(this.groupData, { group: this.form.gcroup })
      return get(group, 'list', [])
    }
  },
  methods: {
    checkForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sending = true
          this.checkMember()
        } else {
          return false
        }
      })
    },
    async checkMember () {
      try {
        const response = await this.$http.post(chkMemberApi, {
          group: this.form.group,
          Ename: this.form.name,
          Phone: this.form.phone,
          SID: this.subInfo.sid
        })
        const {
          IsChgShow,
          ApiTitle,
          DataChangeMsg,
          MID
        } = response.data
        const h = this.$createElement

        if (IsChgShow) {
          const msgArr = []

          DataChangeMsg.map((msg) => {
            msgArr.push(h('li', null, msg))
            return msg
          })

          this.$msgbox({
            title: ApiTitle,
            message: h('ul', null, msgArr),
            confirmButtonText: '我要更新資料＋報名',
            showCancelButton: true,
            cancelButtonText: '重新填寫',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                this.form.mid = MID
                this.form.dataChangeMsg = DataChangeMsg
                this.submitForm()
                done()
              } else {
                this.resetForm('form')
                this.sending = false
                done()
              }
            }
          })
        } else {
          this.form.mid = MID
          this.form.dataChangeMsg = DataChangeMsg
          this.submitForm()
        }
      } catch (error) {
        this.sending = false
        this.$message({ message: '發送發生錯誤，請稍後再試', type: 'error' })
      }
    },
    async submitForm () {
      try {
        const response = await this.$http.post(addSubSignApi, {
          DataChangeMsg: this.form.dataChangeMsg,
          MID: this.form.mid,
          SID: this.subInfo.sid,
          CategoryID: this.subInfo.categoryID,
          gcroup: this.form.gcroup,
          group: this.form.group,
          Ename: this.form.name,
          Phone: this.form.phone,
          Gmail: this.form.email,
          Church: ''
        })

        this.sending = false

        const {
          IsApiError,
          ApiMsg,
          GoLink
        } = response.data

        if (IsApiError) {
          // this.$message({ message: ApiMsg, type: 'error' });
          const h = this.$createElement
          this.$msgbox({
            title: '',
            message: h('p', ApiMsg),
            showCancelButton: GoLink !== '',
            confirmButtonText: GoLink === '' ? '了解' : '前往查詢',
            cancelButtonText: '了解',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm' && GoLink !== '') {
                window.location.href = GoLink
              } else {
                done()
              }
            }
          })
        } else {
          if (this.form.cacheInfo) {
            let date = new Date()
            date.setDate(date.getDate() + 360)
            this.$cookie.set('clc-sign-gcroup', this.form.gcroup, { expires: date })
            this.$cookie.set('clc-sign-group', this.form.group, { expires: date })
            this.$cookie.set('clc-sign-name', this.form.name, { expires: date })
            this.$cookie.set('clc-sign-phone', this.form.phone, { expires: date })
            this.$cookie.set('clc-sign-email', this.form.email, { expires: date })
          } else {
            this.$cookie.delete('clc-sign-gcroup')
            this.$cookie.delete('clc-sign-group')
            this.$cookie.delete('clc-sign-name')
            this.$cookie.delete('clc-sign-phone')
            this.$cookie.delete('clc-sign-email')
          }
          this.resetForm('form')
          this.$emit('onSignSuccess', response.data)
        }
      } catch (error) {
        this.sending = false
        this.$message({ message: '發送發生錯誤，請稍後再試', type: 'error' })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onGcroupChange: function () {
      this.form.group = ''
    },
    onResize () {
      this.labelPosition = window.innerWidth <= 768 ? 'top' : 'right'
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.form.gcroup = this.$cookie.get('clc-sign-gcroup') || ''
    this.form.group = this.$cookie.get('clc-sign-group') || ''
    this.form.name = this.$cookie.get('clc-sign-name') || ''
    this.form.phone = this.$cookie.get('clc-sign-phone') || ''
    this.form.email = this.$cookie.get('clc-sign-email') || ''
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scope>
.el-select {
  display: block !important;
}
.el-message-box {
  width: auto !important;
}
</style>
