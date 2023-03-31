<template>
  <div>
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <p v-if="savedCities.length === 0">
      Nenhuma cidade foi salva ainda, você pode pesquisá-la acima!
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    const requests = [];
    const apiKey = "44badb1339eb6a2633f404c40b2b92eb";
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${apiKey}&units=metric&lang=pt_br`
        )
      );
    });
    const weatherData = await Promise.all(requests);

    await new Promise((res) => setTimeout(res, 200));

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lon: city.coords.lon,
    },
  });
};
</script>
