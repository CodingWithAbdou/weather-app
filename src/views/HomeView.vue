<template>
  <main class="container text-white">
    <div class="relative">
      <input
        @input="getDataSerch"
        v-model="searchValue"
        type="text"
        placeholder="Search for a city or state"
        class="border-b bg-transparent focus:border-weater-secondry focus:outline-none w-full mt-6 py-4 px-6 focus:shadow-sm"
      />
      <ul
        v-if="mapboxResults"
        class="absolute w-full mt-3 bg-weater-secondry p-2 rounded-sm"
      >
        <p v-if="showError" class="py-2">
          Sorry, something went wrong, please try again.
        </p>
        <p v-if="!mapboxResults.length && !showError" class="py-2 text-red-500">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            @click="goToCity(mapboxResult)"
            v-for="mapboxResult in mapboxResults"
            :key="mapboxResult.id"
            class="py-2 text-opacity-80 cursor-pointer"
          >
            {{ mapboxResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const goToCity = (result) => {
  const [city, state] = result.place_name.split(", ");
  router.push({
    name: "CityView",
    params: {
      cityname: city.replaceAll(" ", ""),
      statename: state,
    },
    query: {
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0],
      preview: true,
    },
  });
};

const searchValue = ref(null);
const timeAfterTypeing = ref(null);
const mapboxResults = ref(null);
const showError = ref(null);
const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

const getDataSerch = () => {
  timeAfterTypeing.value = setTimeout(async () => {
    clearTimeout(timeAfterTypeing.value);

    if (searchValue.value == "") return (mapboxResults.value = null);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue.value}.json?access_token=${mapboxAPIKey}&types=place`;

    try {
      const result = await axios.get(url);
      mapboxResults.value = result.data.features;
    } catch {
      showError = true;
    }
  }, 300);
};
</script>
