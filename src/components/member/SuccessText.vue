<template>
  <div class="list-padding" >
    <el-alert
      title=""
      :type="alertType"
      :closable="false"
      center
    >
      <slot></slot>
    </el-alert>
  </div>
</template>

<script>
export default {
  props: {
    alertType: {
      type: String,
      required: true
    }
  }
}
</script>
