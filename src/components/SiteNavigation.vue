<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Tempo Agora</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          v-if="route.query.preview"
          @click="addCity"
        ></i>
      </div>
      <base-modal :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">Sobre:</h1>
          <p class="mb-4">
            O Tempo Agora te ajuda a verificar qual é a temperatura e a sensação
            do tempo na cidade que você quiser.
          </p>
          <h2 class="text-2xl">Como funciona?</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>Pesquise pela cidade no campo de busca</li>
            <li>
              Clique na cidade que corresponder ao que você deseja e você será
              guiado para os resultados referentes a essa cidade.
            </li>
            <li>
              Adicione a cidade aos atalhos, clicando no símbolo de <span class="font-bold"> "+"</span>,
              localizado ao lado deste ícone de informações.
            </li>
          </ol>

          <h2 class="text-2xl">Removendo a cidade dos atalhos</h2>
          <p>
            Se você não quiser mais deixar essa cidade listada nos atalhos para
            fácil acesso, entre na página dessa cidade e clique em "Remover
            Cidade". Não se preocupe! Você pode adicioná-la novamente
            facilmente, da mesma forma que é feita a seleção a princípio:
            clicando no botão <span class="font-bold"> "+"</span>
          </p>

          <p class="text-center italic font-bold pt-5">
            Com o Tempo Agora, Agora você não perde Tempo, é fácil é rápido, você não precisa de Tempo para se acostumar ;D
          </p>
        </div>
      </base-modal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import uid  from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);

const route = useRoute();

const router = useRouter();

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>