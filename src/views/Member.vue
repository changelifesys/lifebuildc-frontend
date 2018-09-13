<template>
  <div>
    <page-header title="線上查詢"></page-header>
    <main>
      <app-form
        v-if="show === 'form'"
        :groupData="groupData"
        @changePage="changePage($event)"
      ></app-form>

      <info-board
        v-if="show === 'info'"
        :info="info"
        @reQuery="reQuery()"
        @changePage="changePage($event)"
      ></info-board>

      <quest-form
        v-if="show === 'quest'"
        @changePage="changePage($event)"
        :info="info"
      ></quest-form>
    </main>
  </div>
</template>

<script>
import PageHeader from '../components/common/PageHeader'
import AppForm from '../components/member/AppForm'
import QuestForm from '../components/member/QuestForm'
import InfoBoard from '../components/member/InfoBoard'

export default {
  name: 'member',
  data () {
    return {
      show: 'form',
      groupData: [],
      error: null,
      info: null
    }
  },
  components: {
    pageHeader: PageHeader,
    appForm: AppForm,
    questForm: QuestForm,
    infoBoard: InfoBoard
  },
  methods: {
    changePage (data) {
      if (!this.error) {
        this.show = data.page
        if (data.info) {
          this.info = data.info
        }
      }
    },
    reQuery () {
      this.show = 'form'
      this.info = null
      this.error = null
    }
  }
}
</script>

<style>
  .el-icon-check.not {
    opacity: 0;
  }
  .class-list {
    list-style: none;
  }
  .list-padding {
    padding:0 40px;
    margin-bottom: 1em;
  }
</style>
