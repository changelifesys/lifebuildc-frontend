<template>
  <div id="member">
    <img id="mainBg" src="../assets/image/title.jpg" alt="生命建造-線上查詢">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <h2 class="alignCenter" style="color: #444;">生命建造-線上查詢</h2>

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

        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
  #mainBg {
    display: block;
    width: 100%;
    height: auto;
  }
  .el-icon-check {
    color: #67C23A;
  }
  .el-icon-check.not {
    opacity: 0;
  }
  .el-icon-close {
    color: #F56C6C;
  }
  .class-list {
    list-style: none;
  }
  .list-padding {
    padding:0 40px;
    margin-bottom: 1em;
  }
</style>
