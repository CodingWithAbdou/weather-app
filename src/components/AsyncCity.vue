<template>
  <div></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const key = "7efa332cf48aeb9d2d391a51027f1a71";

const getWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${key}`;

  try {
    const result = await axios.get(url);

    // cal current date & time
    const localOffset = 60000 * new Date().getTimezoneOffset(); // different with ms;

    const utc = 1000 * result.data.current.dt + localOffset; // get utc ms ;

    result.data.currentTime = 1000 * result.data.timezone_offset + utc; // add current time in obj;

    // cal hourly weather offset

    result.data.hourly.forEach((hour) => {
      const utc = 1000 * hour.dt + localOffset;
      hour.currentTime = 1000 * result.data.timezone_offset + utc;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
console.log(weatherData);
</script>
