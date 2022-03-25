<template>
  <div>
    <PageComponent title="View or create a survey">
      <template v-slot:header>
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ route.params.id ? model.title : "Create a Survey" }}
          </h1>
        </div>
      </template>
      <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <!-- Survey Fields -->
          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <!-- Image -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div class="flex items-center mt-1">
                <img
                  v-if="model.image_url"
                  :src="model.image_url"
                  :alt="model.title"
                  class="object-cover w-64 h-48"
                />
                <span
                  v-else
                  class="flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-[80%] w-[80%] text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  class="relative px-3 py-2 ml-5 overflow-hidden text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <input
                    type="file"
                    @change="onImageChoose"
                    class="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer "
                  />
                  Change
                </button>
              </div>
            </div>
            <!--/ Image -->

            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                type="text"
                name="title"
                id="title"
                v-model="model.title"
                autocomplete="survey_title"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <!--/ Title -->

            <!-- Description -->
            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  v-model="model.description"
                  autocomplete="survey_description"
                  class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe your survey"
                />
              </div>
            </div>
            <!-- Description -->

            <!-- Expire Date -->
            <div>
              <label
                for="expire_date"
                class="block text-sm font-medium text-gray-700"
                >Expire Date</label
              >
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                v-model="model.expire_date"
                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <!--/ Expire Date -->

            <!-- Status -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  v-model="model.status"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700"
                  >Active</label
                >
              </div>
            </div>
            <!--/ Status -->
          </div>
          <!--/ Survey Fields -->

          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <h3
              class="flex items-center justify-between text-2xl font-semibold"
            >
              Questions

              <!-- Add new question -->
              <button
                type="button"
                @click="addQuestion()"
                class="flex items-center px-4 py-1 text-sm text-white bg-gray-600 rounded-sm hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add Question
              </button>
              <!--/ Add new question -->
            </h3>
            <div
              v-if="!model.questions.length"
              class="text-center text-gray-600"
            >
              You don't have any questions created
            </div>
            <div
              v-for="(question, index) in model.questions"
              :key="question.id"
            >
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </div>

          <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </PageComponent>
  </div>
</template>

<script setup>
import { store } from "../store";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRoute,useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const route = useRoute();
const router = useRouter();

let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: [],
});

if (route.params.id) {
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: "",
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q.id !== question.id);
}
function questionChange(question) {
  model.value.questions = model.value.questions.map((q)=>{
    if(q.id===question.id){
      return JSON.parse(JSON.stringify(question))
    }
    return q
  });
}

//create or update survey
function saveSurvey(){
  store.dispatch('saveSurvey',model.value).then(({data})=>{
    router.push({
      name:"SurveyView",
      params:{id:data.data.id}
    })
  })
}
</script>

<style lang="scss" scoped>
</style>