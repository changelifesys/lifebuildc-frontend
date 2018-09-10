<template>
  <el-col
    :span="12"
    :offset="6"
    :xs="{ span: 19, offset: 3 }"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="105px"
      :label-position="labelPosition"
      @submit.prevent.native="checkEnter"
    >

      <el-form-item label="姓名" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="請輸入姓名"
          :disabled="step !== 1"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-if="step !== 1"
        label="小組"
        prop="group"
      >
        <el-select
          v-model="form.group"
          placeholder="請選擇組別"
          clearable
          @change="onSelectChange($event)"
          @clear="onSelectClear"
        >
          <el-option
            v-for="group in groups"
            :key="group"
            :label="group"
            :value="group"
          >
            {{group}}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="step === 3"
        label="組別"
        prop="gcroup"
      >
        <span>{{ form.gcroup }}</span>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="step === 1"
          type="primary"
          @click="submitForm('form')"
          :loading="loading"
          size="small"
        >繼續</el-button>
        <el-button
          v-if="step !== 1"
          type="primary"
          @click="submitForm('form')"
          :loading="loading"
          size="small"
        >查詢</el-button>
        <el-button
          @click="resetForm('form')"
          size="small"
          :disabled="loading"
        >重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import {
  getMemSubDataApi,
  getGroupByEnameApi,
  getClassByGroupApi
} from '../../api'

export default {
  data () {
    return {
      form: {
        gcroup: '',
        group: '',
        name: ''
      },
      rules: {
        group: [{ required: true, message: '請選擇小組', trigger: 'change' }],
        name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }]
      },
      loading: false,
      labelPosition: 'right',
      step: 1,
      groups: []
    }
  },
  methods: {
    checkEnter () {},
    onSelectChange (group) {
      this.submitForm('form')
    },
    onSelectClear () {
      this.form.gcroup = ''
      this.step = 2
    },
    onResize () {
      this.labelPosition = window.innerWidth <= 768 ? 'top' : 'right'
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          switch (this.step) {
            case 1:
              this.getGroup()
              break
            case 2:
              this.getClass()
              break
            case 3:
              this.sendData()
              break
            default:
              break
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.step = 1
      this.groups = []
    },
    sendData () {
      const self = this
      const { form } = self
      const data = {
        gcroup: form.gcroup,
        group: form.group,
        Ename: form.name
      }

      this.$http
        .post(getMemSubDataApi, data)
        .then((response) => {
          self.loading = false
          self.$emit('changePage', { page: 'info', info: response.data })
        })
        .catch((e) => {
          this.showErrorMsg(e)
        })
    },
    getGroup () {
      const self = this
      this.$http
        .post(getGroupByEnameApi, { Ename: this.form.name })
        .then((response) => {
          self.loading = false

          if (response.data.IsApiError) {
            this.$alert(response.data.ApiMsg, '發生錯誤', {
              confirmButtonText: '確定',
              type: 'warning',
              center: true,
              showClose: false
            })
          } else {
            self.groups = response.data.group
            self.step = 2
          }
        })
        .catch((e) => {
          this.showErrorMsg(e)
        })
    },
    getClass () {
      const self = this
      this.$http
        .post(getClassByGroupApi, { group: this.form.group })
        .then((response) => {
          self.loading = false

          if (response.data.IsApiError) {
            this.$alert(response.data.ApiMsg, '發生錯誤', {
              confirmButtonText: '確定',
              type: 'warning',
              center: true,
              showClose: false
            })
          } else {
            self.form.gcroup = response.data.gcroup
            self.step = 3
          }
        })
        .catch((e) => {
          this.showErrorMsg(e)
        })
    },
    showErrorMsg (e) {
      console.warn(e)
      this.loading = false
      this.step = 1
      this.groups = []
      this.$message({
        message: '抱歉！我們的服務發生了一些錯誤',
        type: 'error'
      })
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize, false)
  }
}
</script>

<style scope>
.el-select {
  display: block;
}
.marginBottom0 {
  margin-bottom: 0px;
}
</style>
