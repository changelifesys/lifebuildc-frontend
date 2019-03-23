<template>
  <el-col
    :span="12"
    :offset="6"
    :xs="{ span: 18, offset: 3 }"
  >
    <p class="alignCenter">{{ info.group }}</p>
    <p class="alignCenter">{{ info.Ename }}</p>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(c, cKey, cIndex) in classes"
        :title="cKey"
        :key="cKey"
        :name="String(cIndex + 1)"
      >
        <ul class="class-list">
          <li v-for="lesson in c.list" :key="lesson.statusCode">
            <i class="el-icon-check" v-if="info[lesson.statusCode]" ></i>
            <i class="el-icon-close" v-else></i>
            {{lesson.title}}：<span :class="info[lesson.statusCode] ? 'color-success' : 'color-danger'">
              {{info[lesson.textCode]}}
            </span>
          </li>
        </ul>

        <success-Text
          :alertType="info[c.isPass.statusCode] ? 'success' : 'error'"
        >{{info[c.isPass.textCode]}}</success-Text>
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
    <br>
    <br>
  </el-col>
</template>

<script>
import SuccessText from './SuccessText'

export default {
  data () {
    return {
      activeNames: ['1', '2', '3'],
      classes: {
        C1: {
          list: [
            { title: '第一、二課簽到', statusCode: 'IsC112', textCode: 'TxtC112' },
            { title: '第三、四課簽到', statusCode: 'IsC134', textCode: 'TxtC134' },
            { title: '經歷神營會', statusCode: 'IsExpGod', textCode: 'TxtIsExpGod' },
            { title: '更深經歷神', statusCode: 'IsC1God', textCode: 'TxtC1God' }
          ],
          isPass: { title: 'C1', statusCode: 'IsC1_Status', textCode: 'TxtC1_Status' }
        },
        C2: {
          list: [
            { title: '第一、二課簽到', statusCode: 'IsC212', textCode: 'TxtIsC212' },
            { title: '第三、四課簽到', statusCode: 'IsC234', textCode: 'TxtIsC234' },
            { title: '第五課簽到', statusCode: 'IsC25', textCode: 'TxtIsC25' },
            { title: '見證繳交', statusCode: 'Iswitness', textCode: 'Txtwitness' },
            { title: 'C1考試', statusCode: 'IsC1_Score', textCode: 'TxtC1_Score' },
            { title: '第一、二課考試', statusCode: 'IsC212_Score', textCode: 'TxtC212_Score' },
            { title: '第三、四課考試', statusCode: 'IsC234_Score', textCode: 'TxtC234_Score' },
            { title: '領袖訓練一', statusCode: 'IsC2L1', textCode: 'TxtC2L1' },
            { title: 'QT研習營', statusCode: 'IsC2QT', textCode: 'TxtIsC2QT' },
            { title: '榮耀男人or幸福女人', statusCode: 'IsC2MW', textCode: 'TxtIsC2MW' }
          ],
          isPass: { title: 'C2', statusCode: 'IsC2_Status', textCode: 'TxtC2_Status' }
        },
        C3: {
          list: [
            { title: '九型人格', statusCode: 'IsC3N', textCode: 'TxtIsC3N' },
            { title: '人際關係', statusCode: 'IsC3P', textCode: 'TxtIsC3P' }
          ],
          isPass: { title: 'C3', statusCode: 'IsC3_Status', textCode: 'TxtIsC3_Status' }
        }
      }
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
  methods: {
    handleChange (val) {}
  }
}
</script>
