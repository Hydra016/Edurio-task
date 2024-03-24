<template>
  <div class="md:px-10 px-5 py-5 flex justify-between items-center border border-b-1 border-color-gray-300">
    <div v-if="currRoute === '/'">
      <router-link to="/add"
        class="px-5 py-2 bg-secondary-color text-primary-color rounded-xl font-bold md:text-base text-sm flex items-center hover:bg-green-600"><i
          class="mr-4 pi pi-plus"></i>Add New
        Question</router-link>
    </div>
    <div class="flex" v-if="currRoute === '/add'">
      <router-link to="/"
        class="px-5 py-2 bg-slate-950 text-primary-color rounded-xl flex justify-center font-bold md:text-base text-sm items-center hover:bg-gray-900"><i
          class="mr-4 pi pi-chevron-left"></i> Back</router-link>
    </div>
    <div v-if="currRoute === '/add'">
      <p class="font-black text-3xl text-secondary-color hidden md:block">Add Question</p>
    </div>
    <img src="../assets/edurio.png" class="md:w-28 w-16 object-contain" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppNavbar',
  //OPTIONS API
  // data() {
  //   return {
  //     currRoute: '/'
  //   }
  // },
  // watch: {
  //   '$route': {
  //     handler() {
  //       this.currRoute = this.$route.path
  //     }
  //   }
  // }

  //COMPOSITION API
  setup() {
    let currRoute = ref<string>('/')
    const route = useRoute()

    watch(() => route.path, (newPath) => {
      currRoute.value = newPath
    })

    return { currRoute }
  }
});
</script>