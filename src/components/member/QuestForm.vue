<template>
  <el-col
    :span="12"
    :offset="6"
    :xs="{ span: 20, offset: 2 }"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="questForm"
      label-width="80px"
    >
      <el-alert
        v-if="!isSended"
        title="對查詢結果有疑問嗎？"
        type="info"
        :closable="false"
        description="有任何疑問，請填寫以下表格，我們將會儘快幫助您！">
      </el-alert>
      <br>
      <div v-if="!isSended">
        <el-form-item label="課程" prop="className">
          <el-checkbox-group v-model="form.className">
            <div v-for="className in classes" :key="className.CategoryID">
              <el-checkbox
                :label="className.CategoryID"
                name="className"
              >{{ className.CategoryName }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="信箱" prop="email">
          <el-input v-model="form.email" placeholder="請輸入您的信箱" type="email"></el-input>
        </el-form-item>

        <el-form-item label="主旨" prop="subjectLine">
          <el-input v-model="form.subjectLine" placeholder="請輸入主旨"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="form.desc" :rows="3" placeholder="請輸入問題描述"></el-input>
        </el-form-item>
      </div>

      <el-alert
        v-if="isSended"
        :title="`${info.group} ${info.Ename}`"
        type="success"
        :closable="false"
        :description="apiMsg">
      </el-alert>
      <br v-if="isSended">

      <el-form-item>
        <el-button
          v-if="!isSended"
          type="primary"
          size="small"
          :loading="loading"
          :disabled="isSendDisable"
          @click="onSubmit('questForm')"
        >送出</el-button>
        <el-button
          size="small"
          :disabled="loading"
          @click="$emit('changePage', { page: 'info' })"
        >返回</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import { getSubjectLineApi, sendMemSubQuestionApi } from '../../api'

export default {
  data () {
    return {
      form: {
        className: [],
        email: '',
        subjectLine: '',
        desc: ''
      },
      rules: {
        className: [
          { required: true, message: '請選擇要回報的課程', trigger: 'change' }
        ],
        email: [
          { required: true, message: '請輸入email', trigger: 'blur' },
          { type: 'email', message: '請輸入正確格式的email', trigger: 'blur,change' }
        ],
        subjectLine: [
          { required: true, message: '請輸入主旨', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '請輸入描述', trigger: 'blur' }
        ]
      },
      classes: [],
      loading: false,
      isSended: false,
      apiMsg: ''
    }
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    isSendDisable () {
      return !!(!this.loading && this.classes.length === 0)
    }
  },
  methods: {
    sendData () {
      const self = this
      const textHtml = (this.form.desc.replace(/<(.+?)>/gi, '&lt;$1&gt;').replace(/ /gi, '&nbsp;')).replace(/\n/gi, '<br>')
      const data = {
        gcroup: this.info.gcroup,
        group: this.info.group,
        Ename: this.info.Ename,
        QuestionText: textHtml,
        CategoryName: this.form.className.join(','),
        SubjectLine: this.form.subjectLine,
        Gmail: this.form.email
      }

      this.$http.post(sendMemSubQuestionApi, data)
        .then((response) => {
          self.loading = false
          self.isSended = true
          self.apiMsg = response.data.ApiMsg
        })
        .catch((e) => {
          self.loading = false
          self.$message({
            message: '抱歉！我們的服務發生了一些錯誤',
            type: 'error'
          })
        })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.sendData()
        } else {
          return false
        }
      })
    }
  },
  mounted: function () {
    this.loading = true
    const self = this

    this.$http.get(getSubjectLineApi)
      .then((response) => {
        self.classes = response.data.DataInfo
        self.loading = false
      })
      .catch((e) => {
        self.loading = false
        self.$message({
          message: '抱歉！我們的服務發生了一些錯誤',
          type: 'error'
        })
      })
  }
}
</script>
