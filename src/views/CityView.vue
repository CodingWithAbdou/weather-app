<template>
  <Suspense>
    <template #default>
      <AsyncCity />
    </template>

    <template #fallback>
      <AnimationCityCard />
    </template>
  </Suspense>
</template>

<script setup>
import AnimationCityCard from "../components/AnimationCityCard.vue";
import AsyncCity from "../components/AsyncCity.vue";
</script>
