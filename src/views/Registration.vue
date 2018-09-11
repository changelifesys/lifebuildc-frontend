<template>
  <div id="registration" v-loading.fullscreen.lock="pageLoading">
    <section>
      <header class="alignCenter">
        <img src="../assets/image/title.jpg" id="main-img">
        <h1>生命建造程序</h1>
        <h3>{{ className }}</h3>
      </header>

      <registration-form
        v-if="className && showBlock === 'form'"
        :subInfo="subInfo"
        :groupData="groupData"
        @onSignSuccess="onSignSuccess($event)"
      ></registration-form>

      <sign-info
        v-if="signData && showBlock === 'signInfo'"
        :signData="signData"
        @reSignUp="reSignUp($event)"
      ></sign-info>
    </section>
  </div>
</template>

<script>
import RegistrationForm from '../components/registration/RegistrationForm'
import SignInfo from '../components/registration/SignInfo'
import {
  getSubInfoApi,
  getGroupItemApi
} from '../api'

export default {
  name: 'registration',
  data () {
    return {
      showBlock: 'form',
      className: '',
      subInfo: {
        condition: '',
        date: '',
        endDate: '',
        location: '',
        name: '',
        categoryID: '',
        HtmlSubDesc: ''
      },
      signData: null,
      groupData: [],
      getSubInfoLoading: true,
      getGroupItemLoading: true
    }
  },
  components: {
    registrationForm: RegistrationForm,
    signInfo: SignInfo
  },
  computed: {
    pageLoading: function () {
      return this.getSubInfoLoading || this.getGroupItemLoading
    }
  },
  methods: {
    showWarning (message) {
      this.$alert(message, {
        type: 'error',
        showClose: false,
        showConfirmButton: false,
        center: true
      })
    },
    onSignSuccess (data) {
      this.signData = data
      this.showBlock = 'signInfo'
    },
    reSignUp () {
      this.signData = null
      this.showBlock = 'form'
    }
  },
  created: function () {
    const self = this
    const { id } = this.$route.params

    if (id) {
      this.$http
        .post(getSubInfoApi, {
          CategoryID: id.toUpperCase(),
          PageName: 'SubjectSignUp'
        })
        .then((response) => {
          const {
            SUCondition,
            SubDate,
            SubEndDate,
            SubLocation,
            IsApiError,
            ApiMsg,
            SubName,
            CategoryID,
            SID,
            HtmlSubDesc
          } = response.data

          if (IsApiError) {
            self.showWarning(ApiMsg)
          } else {
            self.className = SubName.split('生命建造程序 ')[1]
            self.subInfo.condition = SUCondition
            self.subInfo.date = SubDate
            self.subInfo.endDate = SubEndDate
            self.subInfo.location = SubLocation
            self.subInfo.categoryID = CategoryID
            self.subInfo.sid = SID
            self.getSubInfoLoading = false
            self.subInfo.HtmlSubDesc = HtmlSubDesc
          }
        })
        .catch((e) => {
          self.showWarning('很抱歉！我們的服務發生了問題')
        })

      this.$http
        .post(getGroupItemApi, { CategoryID: id.toUpperCase() })
        .then((response) => {
          self.groupData = response.data.DataInfo
          self.getGroupItemLoading = false
        })
        .catch((e) => {
          self.showWarning('很抱歉！我們的服務發生了問題')
        })
    } else {
      this.showWarning('查無課程資訊')
    }
  }
}
</script>
