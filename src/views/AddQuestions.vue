<template>
    <div class="">
        <div>
            <div class="flex justify-center bg-red-300 px-10 py-2 mb-5 rounded-xl"
                v-if="msg.type === 'error' && msg.status === true">
                Please fill all the fields
            </div>
            <div class="flex justify-center bg-green-300 px-10 py-2 mb-5 rounded-xl"
                v-if="msg.type === 'success' && msg.status === true">
                Questions saved successfully
            </div>
        </div>

        <div class="">
            <select @change="(e) => handleChangeOption(e)" class="px-5 py-3 bg-primary-color rounded border border-gray-400">
                <option value="multipleChoice">Multiple Choice</option>
                <option value="openQuestion">Open</option>
            </select>
        </div>
        <div class="md:py-14 py-5 md:grid grid-cols-2 gap-16">
            <div>
                <div>
                    <div>
                        <p class="mb-1 text-xl font-bold">Question title*</p>
                        <input v-model="question.title" type="text"
                            class="px-5 py-2 rounded w-full border border-gray-400 " />
                    </div>
                    <div class="mt-5" v-if="question.type === 'multipleChoice'">
                        <p class="mb-1 text-xl font-bold">Options*</p>
                        <div class="flex flex-col" v-for="(option, index) in question.options" :key="index">
                            <label class="text-sm text-gray-400">option {{ index + 1 }}*</label>
                            <input v-model="option.title" type="text"
                                class="px-5 py-2 rounded mb-2 border border-gray-400" />
                        </div>
                    </div>
                </div>
                <button @click="handleQuestion"
                    class="px-5 py-2 bg-secondary-color text-primary-color rounded-xl font-bold mt-5 md:mt-10 flex items-center hover:bg-green-600">Save <i class="ml-4 pi pi-save"></i></button>
            </div>
            <div class="md:mt-0 mt-5 border border-dashed border-gray-400 p-5">
                <p class="mb-1 text-xl font-bold flex justify-center">Question preview</p>
                
                <div class="flex flex-col text-wrap h-full">
                    <p class="font-bold text-2xl" v-if="question.title">Q. {{ question.title }}</p>
                    <div v-if="question.options" class="mt-5 md:mt-10">
                        <div v-for="(option, index) in question.options" :key="index"
                            class="flex items-center md:mb-5 ">
                            <input v-if="option.title" :id="'option-' + index" type="radio" class="mr-3"
                                name="{{ option.title }}" />
                            <label v-if="option.title">{{ option.title }}</label>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MultipleChoiceQuestion, OpenQuestion } from '@/types/Question'

export default defineComponent({
    name: 'App',
    components: {
    },
    data() {
        return {
            msg: {
                status: false,
                type: 'success'
            },
            question: {
                id: Math.floor(Math.random() * 999999),
                type: 'multipleChoice',
                title: '',
                options: Array.from({ length: 5 }, () => ({ title: '', selected: false })),
            } as MultipleChoiceQuestion | OpenQuestion
        }
    },
    watch: {
        'question.type'(newType) {
            if (newType === 'openQuestion') {
                this.question.options = null
            } else {
                this.question.options = Array.from({ length: 5 }, () => ({ title: '', selected: false }))
            }
        },
        'msg'() {
            if (this.msg.status) {
                console.log(this.msg)
                setTimeout(() => {
                    this.msg.status = false;

                }, 3000)

            }
        }
    },
    methods: {
        handleChangeOption(e: Event) {
            const target = e.currentTarget as HTMLInputElement;
            this.question.type = target.value
        },
        handleQuestion() {
            const { title, options } = this.question;
            const isAnyOptionEmpty = options?.some(option => option.title.trim() === "");
            if (title === "" || isAnyOptionEmpty) {
                this.msg = {
                    status: true,
                    type: 'error'
                }
                return
            }


            const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
            existingQuestions.push(this.question);
            localStorage.setItem('questions', JSON.stringify(existingQuestions));

            this.question.title = '';
            this.question.options?.map(option => {
                option.title = ""
            })
            this.msg = {
                status: true,
                type: 'success'
            }
        },
    }
});
</script>

<style scoped>
.text-wrap {
    word-wrap: break-word;
}
</style>