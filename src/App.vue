<template>
  <div class="bg-weater-primary min-h-screen font-Roboto">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style lang="scss" scoped></style>
