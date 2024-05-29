<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch, watchEffect } from 'vue';
import type { CollapseEmits, CollapseItemName, CollapseProps } from './types';
import { COLLAPSE_CTX_KEY } from "./constants";
import { each } from "lodash-es";
import { debugWarn } from "@eui-mp-ui/utils"

const COMPONENT_NAME = "ErCollapse" as const;
defineOptions({
  name: COMPONENT_NAME,
})
const props =defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<CollapseItemName[]>(props.modelValue);

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  each(["update:modelValue", "change"], (e) => {
    emits(e as "update:modelValue" & "change", newNames)
  })
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
    // 存在，删除数组中的一项
    _activeName.splice(index, 1);
  } else {
    // 不存在，插入对应 name
    _activeName.push(item);
  }
  updateActiveNames(_activeName);
}

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMPONENT_NAME, "accordion mode should only have one active item");
  }
})

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