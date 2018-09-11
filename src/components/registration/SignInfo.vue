<template>
  <el-main>
    <el-col
      :span="12"
      :offset="6"
      :xs="{ span: 19, offset: 3 }"
    >
      <div class="class-info alignCenter">
        <h2 class="color-success"><i class="el-icon-success"></i> {{ signData.ApiMsg }}</h2>
        <ul class="class-detail inlineBlock alignLeft">
          <li>
            <span class="class-detail-title">組別：</span>
            <span class="class-detail-text">{{ signData.gcroup }}</span>
          </li>
          <li>
            <span class="class-detail-title">小組：</span>
            <span class="class-detail-text">{{ signData.group }}</span>
          </li>
          <li>
            <span class="class-detail-title">姓名：</span>
            <span class="class-detail-text">{{ signData.Ename }}</span>
          </li>
          <li>
            <span class="class-detail-title">手機：</span>
            <span class="class-detail-text">{{ signData.Phone }}</span>
          </li>
        </ul>
        <br>
        <br>
        <el-button size="small" icon="el-icon-refresh" @click="$emit('reSignUp')">重新報名</el-button>
        <br>
        <br>
      </div>
    </el-col>
  </el-main>
</template>

<script>
export default {
  props: {
    signData: {
      type: Object,
      required: true
    }
  }
}
</script>
