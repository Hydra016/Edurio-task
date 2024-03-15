<template>
  <div>
    <div class="flex h-full w-full justify-center md:mt-60 font-extrabold md:text-3xl" v-if="questions.length < 1">
      No Questions
    </div>
    <div v-else v-for="(quesion, index) in questions" :key="index" class="mb-5 md:mb-10">
      <p class="font-bold md:text-xl mb-3">{{ index + 1 }}. {{ quesion.title }}</p>
      <div v-if="quesion.type === 'multipleChoice'" class="md:grid grid-cols-5 gap-4">
        <div v-for="(option, index) in quesion.options" :key="index" class="flex items-center">
          <input class="mr-3" type="radio" name="{{ option.title }}" />
          <label>{{ option.title }}</label>
        </div>
      </div>
      <div v-else>
        <textarea rows="3" class="resize-none md:w-2/5 w-full border border-gray-400 rounded p-3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Question } from '@/types/Question';
export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      questions: [] as Question[]
    }
  },
  created() {
    const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    this.questions = existingQuestions;
  }
});
</script>
