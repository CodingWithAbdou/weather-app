<template>
  <div v-for="city in savedCities" :key="city.id">
    <CardCity :city="city" @click="goToCityView(city)" />
  </div>

  <p
    v-if="savedCities.length === 0"
    class="bg-weater-secondry py-4 px-6 mt-2 rounded-sm text-gray-200"
  >
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CardCity from "./CardCity.vue";
import { isBuiltInType } from "@vue/compiler-core";

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem("cities")) {
    savedCities.value = JSON.parse(localStorage.getItem("cities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lonAndLat.lat}&lon=${city.lonAndLat.lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};

await getCities();

const router = useRouter();

const goToCityView = (city) => {
  router.push({
    name: "CityView",
    params: { statename: city.state, cityname: city.city },
    query: {
      id: city.id,
      lat: city.lonAndLat.lat,
      lng: city.lonAndLat.lon,
    },
  });
};
</script>
