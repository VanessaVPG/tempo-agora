
import Animate
  components: { AnimatedPlaceholder },dPlaceholder from './AnimatedPlaceholder.vue';

<template>
  <div class="flex flex-col py-12 items-center">
    <AnimatedPlaceholder class="max-w-[300px] w-full mb-2" />
    <AnimatedPlaceholder class="max-w-[300px] w-full mb-12" />
    <AnimatedPlaceholder class="max-w-[300px] h-[100px] w-full mb-12" />
    <AnimatedPlaceholder class="max-w-[300px] w-full mb-8" />
    <AnimatedPlaceholder class="max-w-[300px] h-[75px] w-full" />
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';

</script>