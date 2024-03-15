<template>
  <Navbar />
  <div class="md:px-10 py-5 px-5">
    <router-view />
  </div>
</template>



<script lang="ts">
import Navbar from './components/Navbar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  },
});
</script>

<style></style>
