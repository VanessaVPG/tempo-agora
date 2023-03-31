<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Pesquise por uma cidade"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="openWeatherMapResults"
      >
        <p v-if="searchError">Desculpe =/ algo está errado!</p>

        <p v-if="!searchError && openWeatherMapResults.length === 0">
          Nenhum resultado corresponde à pesquisa!
        </p>
        <template v-else>
          <li
            v-for="searchResult in openWeatherMapResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.name + ", " + searchResult.state }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

const openWeatherMapAPIKey = "1b52850d58645e9b2785b18e64accb75";
const openWeatherMapResults = ref(null);
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchError = ref(null);

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult);
  const city = searchResult.name;
  const state = searchResult.state;

  router.push({
    name: "cityView",
    params: { state: state, city: city },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&appid=${openWeatherMapAPIKey}
          
          `
        );
        openWeatherMapResults.value = result.data;
      } catch {
        searchError.value = true;
      }
      return;
    }
    openWeatherMapResults.value = null;
  }, 300);
};
</script>