<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import type { CollapseEmits, CollapseItemName, CollapseProps } from './types';
import { COLLAPSE_CTX_KEY } from "./constants";

const COMPONENT_NAME = "ErCollapse" as const;
defineOptions({
  name: COMPONENT_NAME,
})
const props =defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<CollapseItemName[]>(props.modelValue);

if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one active item");
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  emits("update:modelValue", newNames);
  emits("change", newNames);
}

function handleItemClick(item: CollapseItemName) {
  let _activeName = [...activeNames.value];
  if (props.accordion) {
    _activeName = [_activeName[0] === item ? "" : item];
    updateActiveNames(_activeName);
    return;
  }

  const index = _activeName.indexOf(item);
  if (index > -1) {
    _activeName.splice(index, 1);
  } else {
    _activeName.push(item);
  }
  updateActiveNames(_activeName);
}

watch(() => props.modelValue, (newNames) => {
  updateActiveNames(newNames);
})

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
});
</script>

<style scoped>
@import "./style.css";
</style>