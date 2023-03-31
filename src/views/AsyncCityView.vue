<template>
  <div class="flex flex-col flex-1 items-center">
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary">
      <p>
        Você está visualizando essa cidade, clique no icone "+" para começar a
        adicionar a cidade nos atalhos
      </p>
    </div>

    <div class="flex flex-col items-center py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("pt-br", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("pt-br", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">{{ Math.round(weatherData.main.temp) }} &deg;</p>
      <div class="text-center">
        <p>Sensação de {{ Math.round(weatherData.main.feels_like) }} &deg;</p>
        <p class="capitalize">{{ weatherData.weather[0].description }}</p>
        <img
          class="w-[150px] h-auto"
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        />
      </div>
    </div>
    <div
      v-if="!route.query.preview"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remover Cidade</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const apiKey = "44badb1339eb6a2633f404c40b2b92eb";
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=${apiKey}&units=metric&lang=pt_br`
    );
    const localOffSet = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.dt * 1000 + localOffSet;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone;
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>

