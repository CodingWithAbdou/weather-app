<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="w-full text-center text-white p-4 bg-weater-secondry"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <!-- weather view -->
    <div class="flex flex-col items-center text-white py-12">
      <h2 class="text-4xl">
        {{ route.params.cityname }}
      </h2>
      <p class="mt-2 mb-12 text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;c
      </p>
      <p class="">
        Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;c
      </p>
      <p>{{ weatherData.current.weather[0].description }}</p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr class="border border-white border-opacity-20 w-full" />
    <!-- Hourly Weather -->

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h3 class="mb-4 text-3xl">Hourly Weather</h3>
        <div class="flex gap-10 overflow-x-scroll pb-12">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border border-white border-opacity-20 w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h3 class="mb-4 text-3xl">7 Day Forecast</h3>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>
              H: {{ Math.round(day.temp.max) }}&deg;
              <span class="text-black">|</span>
            </p>
            <p>L: {{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <!--Remove City -->
    <div class="w-full text-center py-4 mb-6" v-if="route.query.id">
      <span
        @click="removeCity()"
        class="cursor-pointer text-white hover:text-red-600 duration-300 ease-linear"
      >
        <i class="fa-solid fa-trash-can"></i> Remove City</span
      >
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const route = useRoute();

const router = useRouter();

const key = "7efa332cf48aeb9d2d391a51027f1a71";

const getWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${key}&units=metric`;

  try {
    const result = await axios.get(url);

    // call current date & time
    const localOffset = 60000 * new Date().getTimezoneOffset(); // different with ms;

    const utc = 1000 * result.data.current.dt + localOffset; // get utc ms ;

    result.data.currentTime = 1000 * result.data.timezone_offset + utc; // add current time in obj;

    // call hourly weather offset

    result.data.hourly.forEach((hour) => {
      const utc = 1000 * hour.dt + localOffset;
      hour.currentTime = 1000 * result.data.timezone_offset + utc;
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();

const removeCity = () => {
  const citiesData = JSON.parse(localStorage.getItem("cities"));

  const updatecities = citiesData.filter((city) => city.id !== route.query.id);

  localStorage.setItem("cities", JSON.stringify(updatecities));

  router.push({ name: "home" });
};
</script>
