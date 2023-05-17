<template>
  <header class="bg-weater-primary shadow-lg text-white">
    <nav class="container flex justify-between p-5">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex justify-center items-center gap-2">
          <i class="fa-solid fa-cloud-sun"></i>
          <h1>The Local Weater</h1>
        </div>
      </RouterLink>
      <div class="flex gap-3 items-center">
        <i
          @click="showModel"
          class="fa-solid fa-circle-info cursor-pointer hover:text-weater-secondry duration-200"
        ></i>
        <i
          class="fa-solid fa-plus cursor-pointer hover:text-weater-secondry duration-200"
        ></i>
      </div>
      <modal-window :modelBounce="modelBounce" @is-clicked="showModel()">
        <div>
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </modal-window>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ModalWindow from "./ModalWindow.vue";
import { ref } from "vue";

const modelBounce = ref(null);
const showModel = () => {
  modelBounce.value = !modelBounce.value;
};
</script>
