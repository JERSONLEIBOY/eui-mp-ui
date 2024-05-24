<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const COMPONENT_NAME = "ErCollapse" as const;
defineOptions({
  name: COMPONENT_NAME,
})
</script>

<style scoped>
@import "./style.css";
</style>