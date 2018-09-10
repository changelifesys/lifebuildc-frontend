<template>
  <el-col
    :span="12"
    :offset="6"
    :xs="{ span: 18, offset: 3 }"
  >
    <p class="center">{{ info.group }}</p>
    <p class="center">{{ info.Ename }}</p>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="C1" name="1">
        <ul class="class-list">
          <li>
            <i class="el-icon-check" v-if="info.IsC112" ></i>
            <i class="el-icon-close" v-else></i>
            第一、二課簽到：<span :class="info.IsC112 ? 'color-success' : 'color-danger'">{{info.TxtC112}}</span>
          </li>
          <li>
            <i class="el-icon-check" :class="{ not: !info.IsC134 }"></i>
            第三、四課簽到：<span :class="info.IsC134 ? 'color-success' : 'color-danger'">{{info.TxtC134}}</span>
          </li>
        </ul>
        <success-Text
          :alertType="alertTypeC1"
          v-if="info.TxtC1_Status"
        >{{info.TxtC1_Status}}</success-Text>
      </el-collapse-item>
      <el-collapse-item title="C2" name="2">
        <ul class="class-list">
          <li>
            <i class="el-icon-check" v-if="info.IsC212" ></i>
            <i class="el-icon-close" v-else></i>
            第一、二課簽到：<span :class="info.IsC212 ? 'color-success' : 'color-danger'">{{info.TxtIsC212}}</span>
          </li>
          <li>
            <i class="el-icon-check" v-if="info.IsC234" ></i>
            <i class="el-icon-close" v-else></i>
            第三、四課簽到：<span :class="info.IsC234 ? 'color-success' : 'color-danger'">{{info.TxtIsC234}}</span>
          </li>
          <li>
            <i class="el-icon-check" v-if="info.IsC25" ></i>
            <i class="el-icon-close" v-else></i>
            第五課簽到：<span :class="info.IsC25 ? 'color-success' : 'color-danger'">{{info.TxtIsC25}}</span>
          </li>
          <li>
            <i class="el-icon-check" v-if="info.Iswitness" ></i>
            <i class="el-icon-close" v-else></i>
            見證繳交：<span :class="info.Iswitness ? 'color-success' : 'color-danger'">{{info.Txtwitness}}</span>
          </li>
          <li>
            <i class="el-icon-check" v-if="info.IsC1_Score" ></i>
            <i class="el-icon-close" v-else></i>
            C1考試： <span :class="info.IsC1_Score ? 'color-success' : 'color-danger'">{{ info.TxtC1_Score }}</span>
          </li>
          <li>
            <i class="el-icon-check" v-if="info.IsC212_Score" ></i>
            <i class="el-icon-close" v-else></i>
            第一、二課考試： <span :class="info.IsC212_Score ? 'color-success' : 'color-danger'">{{ info.TxtC212_Score }}</span>
          </li>
          <li>
            <i class="el-icon-check" v-if="info.IsC234_Score" ></i>
            <i class="el-icon-close" v-else></i>
            第三、四課考試： <span :class="info.IsC234_Score ? 'color-success' : 'color-danger'">{{ info.TxtC234_Score }}</span>
          </li>
        </ul>
        <success-Text
          :alertType="alertTypeC2"
          v-if="info.TxtC2_Status"
        >{{info.TxtC2_Status}}</success-Text>
      </el-collapse-item>
    </el-collapse>
    <br>
    <el-button
      size="small"
      icon="el-icon-question"
      @click="$emit('changePage', { page: 'quest' })"
    >我有問題</el-button>
    <el-button
      size="small"
      icon="el-icon-refresh"
      @click="$emit('reQuery')"
    ></el-button>
    <br>
  </el-col>
</template>

<script>
import SuccessText from './SuccessText'

export default {
  data () {
    return {
      activeNames: ['1', '2']
    }
  },
  components: {
    successText: SuccessText
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    alertTypeC1: function () {
      return this.info.IsC1_Status ? 'success' : 'error'
    },
    alertTypeC2: function () {
      return this.info.IsC2_Status ? 'success' : 'error'
    }
  },
  methods: {
    handleChange (val) {}
  }
}
</script>
